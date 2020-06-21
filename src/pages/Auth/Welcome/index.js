import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Fruits from '~/assets/fruits.svg';

import { Background, Container, FacebookButton, Text, Logo } from './styles';
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
      .then(result => {
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
          height: 550,
          alignItems: 'center',
          justifyContent: 'space-around',
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
        <Input
          style={{
            borderWidth: 1,
            borderColor: '#333',
            height: 45,
            borderRadius: 20,
            marginBottom: 5,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          icon="user"
          placeholder="E-mail"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          style={{
            borderWidth: 1,
            borderColor: '#333',
            height: 45,
            borderRadius: 20,
            marginBottom: 10,
          }}
          icon="lock"
          secureTextEntry
          placeholder="Senha"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={login}
          value={password}
          onChangeText={setPassword}
        />
        <FacebookButton
          onPress={handleFacebookLogin}
          title="Continue with FB"
          style={{
            backgroundColor: '#4267B2',
          }}
        >
          <Icon name="facebook-square" color="#fff" size={20} />
          <Text>Entrar com Facebook</Text>
        </FacebookButton>
        <Button
          loading={loading}
          style={{ marginTop: 5, height: 40, borderRadius: 30 }}
          onPress={login}
        >
          <Text>Entrar com Email</Text>
        </Button>
      </Container>
    </Background>
  );
}

Welcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
