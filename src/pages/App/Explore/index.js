import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '~/components/Header';

import Promotions from './Promotions';
import Stores from './Stores';
import Deliveries from './Deliveries';
import Tips from './Tips';

export default function Explore() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <Header />
      <Tab.Navigator
        initialRouteName="Promoções"
        tabBarOptions={{
          activeTintColor: '#000',
          inactiveTintColor: '#999',
          style: {
            height: 45,
            justifyContent: 'space-evenly',
          },
          labelStyle: { fontSize: 11, textTransform: 'capitalize' },
          indicatorStyle: { backgroundColor: '#12b118', height: 4 },
        }}
      >
        <Tab.Screen name="Promoções" component={Promotions} />
        <Tab.Screen name="Lojas" component={Stores} />
        <Tab.Screen name="Entregas" component={Deliveries} />
        <Tab.Screen name="Dicas" component={Tips} />
      </Tab.Navigator>
    </>
  );
}
