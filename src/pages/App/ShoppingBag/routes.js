import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Bag from './index';
import Checkout from './pages/Checkout';

export default function Routes() {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <Stack.Navigator initialRouteName="Bag" headerMode="none">
        <Stack.Screen name="Bag" component={Bag} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </>
  );
}
