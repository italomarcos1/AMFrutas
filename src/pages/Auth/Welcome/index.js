import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text as RNText, TouchableOpacity, Modal, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
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
  Text,
  Logo,
  Header,
  CloseModal,
  WelcomeContainer,
  ForgotPassword,
} from './styles';

import { signInRequest, signInSuccess } from '~/store/modules/auth/actions';
import { hideTabBar } from '~/store/modules/user/actions';

import api from '~/services/api';

Icon.loadFont();

export default function Welcome({ closeModal }) {
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

  useEffect(() => {
    dispatch(hideTabBar());
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
    LoginManager.logInWithPermissions(['public_profile'])
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
              Toast.show('Erro ao logar com Facebook. Logue com seu e-mail. ');
            });
        });
      })
      .catch(() => {
        Toast.show('Erro ao logar com Facebook. Logue com seu e-mail. ');
      });
  }, [dispatch]);

  return (
    <Background>
      <Container
        contentContainerStyle={{
          height: 800,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
          paddingBottom: 60,
        }}
      >
        <Header>
          <CloseModal onPress={() => closeModal()}>
            <CustomIcon name="x" size={25} color="#000" />
          </CloseModal>
          <Logo />
        </Header>
        <Fruits
          width={180}
          height={180}
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
        />
        <WelcomeContainer>
          <RNText style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}>
            Bem-vindo
          </RNText>
          <RNText style={{ fontSize: 14, color: '#444', marginTop: 3 }}>
            Cadastre-se gratuitamente em 15 segundos
          </RNText>
        </WelcomeContainer>

        <Input
          style={{
            height: 55,
            borderRadius: 30,
            marginBottom: 10,
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
            console.tron.log('uai');
          }}
        >
          <RNText style={{ color: '#888', textAlign: 'center' }}>
            Recuperar Senha?
          </RNText>
        </ForgotPassword>
        <Button
          login
          loading={loading}
          style={{
            marginTop: 5,
            marginBottom: 20,
            height: 50,
            borderRadius: 30,
            backgroundColor: '#3B8E39',
          }}
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
          <Text>Entrar com Facebook</Text>
        </FacebookButton>
      </Container>
      <Modal
        visible={forgotPasswordModal}
        onRequestClose={setForgotPasswordVisible}
      >
        <View
          style={{
            flex: 0.7,
            justifyContent: 'space-around',
            paddingHorizontal: 20,
          }}
        >
          <Header>
            <CloseModal onPress={() => setForgotPasswordVisible(false)}>
              <CustomIcon name="x" size={25} color="#000" />
            </CloseModal>
            <Logo />
          </Header>
          <WelcomeContainer>
            <RNText style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}>
              Recuperação de senha
            </RNText>
            <RNText style={{ fontSize: 14, color: '#444', marginTop: 3 }}>
              Será-lhe enviado um código para recuperar a senha
            </RNText>
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
              style={{
                marginTop: 5,
                marginBottom: 20,
                height: 50,
                borderRadius: 30,
                backgroundColor: '#3B8E39',
              }}
              onPress={handleForgotPassword}
            >
              Recuperar senha
            </Button>
          </WelcomeContainer>
        </View>
      </Modal>
    </Background>
  );
}

Welcome.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
