import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import Account from './index';

import Mail from './pages/Mail';

import Name from './pages/Name';
import Gender from './pages/Gender';
import Pass from './pages/Pass';
import Shipping from './pages/Shipping';
import Orders from './pages/Orders/routes';
import AddNewAddress from './pages/Shipping/AddNewAddress';
import EditAddress from './pages/Shipping/EditAddress';

import Header from '~/components/HeaderMenu';

Icon.loadFont();

export default function Routes({ navigation }) {
  const Stack = createStackNavigator(); // abrir como um modal talvez, já retorna pro drawer
  const signed = useSelector(state => state.auth.signed);

  const exit = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={({ navigation }) => ({
        header: () => (
          <Header
            title={signed ? 'Editar conta' : 'Faça login ou cadastre-se'}
            close={exit}
          />
        ),
      })}
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen
        name="EditName"
        component={Name}
        options={({ navigation }) => ({
          header: () => (
            <Header title="Nome do perfil" close={() => navigation.goBack()} />
          ),
        })}
      />

      <Stack.Screen
        name="Mail"
        component={Mail}
        options={({ navigation }) => ({
          header: () => (
            <Header title="Verificar email" close={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="Gender"
        component={Gender}
        options={({ navigation }) => ({
          header: () => (
            <Header title="Sexo" close={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="Pass"
        component={Pass}
        options={({ navigation }) => ({
          header: () => (
            <Header title="Alterar senha" close={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="Shipping"
        component={Shipping}
        options={({ navigation }) => ({
          header: () => (
            <Header
              custom
              title="Endereço de entrega"
              close={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={({ navigation }) => ({
          header: () => (
            <Header
              custom
              title="Minhas compras"
              close={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Stack.Screen
        name="AddNewAddress"
        component={AddNewAddress}
        options={({ navigation }) => ({
          header: () => (
            <Header
              title="Adicionar endereço"
              close={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddress}
        options={({ navigation }) => ({
          header: () => (
            <Header title="Editar endereço" close={() => navigation.goBack()} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

Routes.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    openDrawer: PropTypes.func,
  }).isRequired,
};
