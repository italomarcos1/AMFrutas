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

Icon.loadFont();

export default function Routes() {
  const Stack = createStackNavigator(); // abrir como um modal talvez, já retorna pro drawer

  return (
    <Stack.Navigator initialRouteName="Account" headerMode="none">
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="EditName" component={Name} />

      <Stack.Screen name="Mail" component={Mail} />
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="Pass" component={Pass} />
      <Stack.Screen name="Shipping" component={Shipping} />
      <Stack.Screen name="Orders" component={Orders} />

      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
    </Stack.Navigator>
  );
}

Routes.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    openDrawer: PropTypes.func,
  }).isRequired,
};
