import React, { useCallback, useRef, useState, useEffect } from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
  FacebookButtonText,
  Logo,
  Header,
  CloseModal,
  WelcomeContainer,
  WelcomeTitle,
  WelcomeDisclame,
  ForgotPassword,
  ForgotPasswordText,
} from './styles';

import { signInRequest, signInSuccess } from '~/store/modules/auth/actions';
import { hideTabBar } from '~/store/modules/user/actions';

import api from '~/services/api';

Icon.loadFont();

export default function Auth({ closeModal }) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selected, setSelected] = useState('none');

  const passwordRef = useRef();

  const login = useCallback(() => {
    setSelected('none');
    dispatch(signInRequest(email, password));
  }, [email, password, dispatch]);

  useEffect(() => {
    dispatch(hideTabBar());
  }, []);

  const handleFacebookLogin = useCallback(() => {
    setSelected('none');

    LoginManager.logInWithPermissions(['public_profile'])
      .then(() => {
        AccessToken.getCurrentAccessToken().then(data => {
          setFacebookLoading(true);
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
              Toast.show(
                'Não foi possível fazer login com facebook, realize o login com seu email e senha.'
              );

              setFacebookLoading(false);
            });
        });
      })
      .catch(() => {
        Toast.show(
          'Não foi possível fazer login com facebook, realize o login com seu email e senha.'
        );

        setFacebookLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />

      <Background>
        <Container
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Header>
            <CloseModal onPress={() => closeModal()}>
              <CustomIcon name="x" size={25} color="#000" />
            </CloseModal>
            <Logo />
          </Header>

          <Fruits width={180} height={180} />

          <WelcomeContainer>
            <WelcomeTitle>Bem-vindo</WelcomeTitle>

            <WelcomeDisclame>
              Cadastre-se gratuitamente em 15 segundos
            </WelcomeDisclame>
          </WelcomeContainer>

          <Input
            style={{
              height: 55,
              borderRadius: 30,
              marginBottom: 15,
              paddingLeft: 20,
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
              paddingLeft: 20,
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

          <ForgotPassword>
            <ForgotPasswordText>Recuperar Senha?</ForgotPasswordText>
          </ForgotPassword>

          <Button
            login
            loading={loading}
            textSize={16}
            style={{
              marginTop: 5,
              marginBottom: 10,
              height: 55,
              borderRadius: 30,
              backgroundColor: '#3B8E39',
            }}
            onPress={login}
          >
            Entrar ou Registar
          </Button>

          <FacebookButton onPress={handleFacebookLogin}>
            {facebookLoading ? (
              <>
                <ActivityIndicator size="large" color="#fff" />
                <FacebookButtonText>Aguarde...</FacebookButtonText>
              </>
            ) : (
              <>
                <Icon name="facebook" color="#fff" size={20} />
                <FacebookButtonText>Entrar com Facebook</FacebookButtonText>
              </>
            )}
          </FacebookButton>
        </Container>
      </Background>
    </>
  );
}

Auth.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
