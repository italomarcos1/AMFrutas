import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text as RNText, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { isIphoneX } from 'react-native-iphone-x-helper';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';
import CustomIcon from 'react-native-vector-icons/Feather';

import Input from '~/components/Input';
import Button from '~/components/Button';

import Fruits from '~/assets/fruits.svg';

import {
  Background,
  Container,
  FacebookButton,
  Logo,
  CloseModal,
  AuthTitle,
  RegisterText,
  Form,
  ForgotPassword,
  ForgotPasswordContainer,
} from './styles';

import { signInRequest, signInSuccess } from '~/store/modules/auth/actions';
import { hideTabBar } from '~/store/modules/user/actions';

import api from '~/services/api';

Icon.loadFont();

export default function Auth({ closeModal }) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState('');
  const [selected, setSelected] = useState('none');

  const [forgotPasswordModal, setForgotPasswordVisible] = useState(false);
  const [updating, setUpdating] = useState(false);

  const passwordRef = useRef();

  const login = useCallback(() => {
    setSelected('none');
    dispatch(signInRequest(email, password));
  }, [email, password, dispatch]);

  async function onAppleButtonPress() {
    if (appleAuth.isSupported) {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        api
          .post('auth/apple', appleAuthRequestResponse)
          .then(() => {
            Toast.show('Dados enviados! Obrigado');
          })
          .catch(() => {
            Toast.show('Erro ao logar com Apple. Logue com seu e-mail.');
          });
      }
    }
  }

  useEffect(() => {
    dispatch(hideTabBar());

    if (appleAuth.isSupported) return appleAuth.onCredentialRevoked(() => {});
  }, []);

  const handleForgotPassword = useCallback(async () => {
    try {
      setUpdating(true);
      const {
        data: { meta },
      } = await api.post('auth/reset-password', { email: forgotPassword });

      setForgotPasswordVisible(false);
      Toast.show(meta.message);
      setUpdating(false);
    } catch (err) {
      setUpdating(false);

      Toast.show('Não foi possível resetar sua senha.');
      setForgotPasswordVisible(false);
    }
  }, []);

  const handleFacebookLogin = useCallback(() => {
    setSelected('none');

    LoginManager.logOut();

    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(() => {
        AccessToken.getCurrentAccessToken().then(data => {
          const { accessToken, userID } = data;

          api
            .post('auth/facebook', {
              token: accessToken,
              userID,
            })
            .then(response => {
              const { token, user } = response.data.data;
              api.defaults.headers.Authorization = `Bearer ${token}`;
              dispatch(signInSuccess(token, user));
            })
            .catch(() => {
              Toast.show('Erro ao logar com Facebook. Logue com seu e-mail.');
            });
        });
      })
      .catch(() => {
        Toast.show(
          'Não foi possível fazer login com Facebook, por favor entre com seu email'
        );
      });
  }, [dispatch]);

  return (
    <KeyboardAvoidingView 
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      keyboardVerticalOffset={0}
    >
      <Container
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 30,
          paddingTop: 50
        }}
      >
        <CloseModal onPress={() => closeModal()}>
          <CustomIcon name="x" size={25} color="#000" />
        </CloseModal>

        <Logo />

        <Fruits width={150} height={150} />

        <AuthTitle>Bem-vindo</AuthTitle>
        <RegisterText>Registe-se gratuitamente em 15 segundos</RegisterText>

        <Form>
          <Input
            style={{
              height: 55,
              borderRadius: 30,
              marginBottom: 10,
              width: '90%',
            }}
            onFocus={() => setSelected('email')}
            selected={selected === 'email'}
            autoCapitalize="none"
            autoCorrect={false}
            icon="user"
            placeholder="Seu email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Input
            style={{
              height: 55,
              borderRadius: 30,
              marginBottom: 10,
              width: '90%',
            }}
            onFocus={() => setSelected('password')}
            selected={selected === 'password'}
            icon="lock"
            secureTextEntry
            placeholder="Sua senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={login}
            value={password}
            onChangeText={setPassword}
          />

          <ForgotPassword
            onPress={() => {
              setForgotPasswordVisible(true);
            }}
          >
            <RNText style={{ color: '#888', textAlign: 'center' }}>
              Recuperar Senha?
            </RNText>
          </ForgotPassword>

          <Button
            style={{
              marginTop: 5,
              marginBottom: 10,
              height: 50,
              borderRadius: 30,
              backgroundColor: '#3b8e39',
            }}
            textSize={20}
            login
            loading={loading}
            onPress={login}
          >
            Entrar ou Registar
          </Button>

          <FacebookButton
            onPress={handleFacebookLogin}
            title="Continue with FB"
            style={{
              backgroundColor: '#3B5998',
            }}
          >
            <Icon name="facebook" color="#fff" size={20} />
            <RNText style={{ fontSize: 20, color: '#fff', padding: 10 }}>
              Entrar com Facebook
            </RNText>
          </FacebookButton>

          {Platform.OS === 'ios' && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              cornerRadius={50}
              style={{
                width: '80%',
                height: 52,
                marginTop: 10,
              }}
              onPress={() => onAppleButtonPress()}
            />
          )}
        </Form>
      </Container>

      <Modal
        visible={forgotPasswordModal}
        onRequestClose={setForgotPasswordVisible}
      >
        <Container
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 30,
            paddingTop: 50,
            paddingHorizontal: 20
          }}
        >
          <CloseModal onPress={() => setForgotPasswordVisible(false)}>
            <CustomIcon name="x" size={25} color="#000" />
          </CloseModal>

          <Logo />

          <Fruits width={200} height={200} />

          <RNText style={{ fontSize: 28, fontWeight: 'bold', color: '#000', marginTop: 40 }}>
            Recuperação de senha
          </RNText>

          <RNText style={{ fontSize: 14, color: '#444', marginTop: 3 }}>
            Será-lhe enviado um código para recuperar a senha
          </RNText>

          <Form>
            <Input
              style={{
                height: 55,
                borderRadius: 30,
                marginBottom: 10,
                marginTop: 20,
                backgroundColor: '#f2f2f2',
              }}
              onFocus={() => setSelected('forgotpassword')}
              selected={selected === 'forgotpassword'}
              icon="mail"
              placeholder="Seu email"
              returnKeyType="send"
              onSubmitEditing={handleForgotPassword}
              value={forgotPassword}
              onChangeText={setForgotPassword}
            />

            <Button
              login
              loading={updating}
              disabled={updating}
              onPress={handleForgotPassword}
              style={{
                marginTop: 5,
                marginBottom: 20,
                height: 50,
                borderRadius: 30,
                backgroundColor: '#3b8e39',
                width: 250,
              }}
            >
              Recuperar senha
            </Button>
          </Form>
        </Container>
      </Modal>
    </KeyboardAvoidingView>
  );
}

Auth.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
