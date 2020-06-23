import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text as RNText } from 'react-native';
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
  Text,
  Logo,
  WelcomeContainer,
  ForgotPassword,
} from './styles';
import { signInRequest, signInSuccess } from '~/store/modules/auth/actions';

import api from '~/services/api';

Icon.loadFont();

export default function Welcome() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

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
        <Logo />
        <Fruits
          width={220}
          height={220}
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <WelcomeContainer>
          <RNText style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}>
            Bem-vindo
          </RNText>
          <RNText style={{ fontSize: 14, color: '#444' }}>
            Cadastre-se gratuitamente em 15 segundos
          </RNText>
        </WelcomeContainer>

        <Input
          style={{
            height: 55,
            borderRadius: 30,
            marginBottom: 10,
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
          <RNText style={{ color: '#888', textAlign: 'center' }}>
            Recuperar Senha?
          </RNText>
        </ForgotPassword>
        <Button
          login
          loading={loading}
          style={{
            marginTop: 5,
            marginBottom: 10,
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
    </Background>
  );
}

Welcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
