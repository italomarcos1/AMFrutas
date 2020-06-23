import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Home from '~/pages/App/Home/routes';
import Explore from '~/pages/App/Explore/routes';
import ShoppingBag from '~/pages/App/ShoppingBag';
import Favorites from '~/pages/App/Favorites/routes';
import Account from '~/pages/App/Account/routes';
import StoresScreen from '~/pages/App/Explore/Stores';

import Header from '~/components/Header';

export default function Routes() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#12b118',
          inactiveTintColor: '#333',
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={() => ({
            header: () => <Header />,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={20} color={color} />
            ),
          })}
          tabB
        />

        <Tab.Screen
          name="Lojas"
          component={StoresScreen}
          options={() => ({
            header: () => <Header />,
            tabBarLabel: 'Lojas',
            tabBarIcon: ({ color }) => (
              <Icon name="map-pin" size={20} color={color} />
            ),
          })}
        />

        <Tab.Screen
          name="ShoppingBag"
          component={ShoppingBag}
          options={() => ({
            tabBarLabel: 'Cesta',
            tabBarIcon: ({ color }) => (
              <Icon name="shopping-bag" size={20} color={color} />
            ),
          })}
        />

        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={() => ({
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ color }) => (
              <Icon name="star" size={20} color={color} />
            ),
          })}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          options={() => ({
            title: 'Conta',
            tabBarIcon: ({ color }) => (
              <Icon name="user" size={20} color={color} />
            ),
          })}
        />
      </Tab.Navigator>
    </>
  );
}
