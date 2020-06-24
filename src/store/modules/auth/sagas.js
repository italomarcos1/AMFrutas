import { call, put, all, takeLatest } from 'redux-saga/effects';
import Toast from 'react-native-tiny-toast';

import api from '~/services/api';

import { signInSuccess, signFailure } from '~/store/modules/auth/actions';
import { addFavorites } from '~/store/modules/cart/actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, 'auth/login', { email, password });
    console.tron.log('uai');
    const { token, user } = response.data.data;

    const { name, last_name } = user;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const favResponse = yield call(api.get, 'clients/wishlists');

    const favorites = favResponse.data.data;

    yield put(addFavorites(favorites));

    if (name === '' && last_name === '') {
      const { data } = yield call(api.put, 'clients', {
        name: 'Cliente',
        last_name: 'AMFrutas',
      });
      const updatedUser = data.data;

      yield put(signInSuccess(token, updatedUser));

      return;
    }

    yield put(signInSuccess(token, user));
  } catch (error) {
    Toast.show('Erro no login, confira seus dados.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
