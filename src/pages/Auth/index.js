import React, { useCallback, useRef, useState } from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Fruits from '~/assets/fruits.svg';

import {
  Background,
  Container,
  FacebookButton,
  FacebookButtonText,
  Logo,
  WelcomeContainer,
  WelcomeTitle,
  WelcomeDisclame,
  ForgotPassword,
  ForgotPasswordText,
} from './styles';
import { signInRequest, signInSuccess } from '~/store/modules/auth/actions';

import api from '~/services/api';

Icon.loadFont();

export default function Auth() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  const login = useCallback(() => {
    dispatch(signInRequest(email, password));
  }, [email, password, dispatch]);

  const handleFacebookLogin = useCallback(() => {
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
          <Logo />

          <Fruits width={220} height={220} />

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
            login
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
            login
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
