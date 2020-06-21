import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Explore from './index';

import Menu from '~/components/Menu';
import Content from '~/components/Content';
import Category from '~/components/Category';
import ChildrenCategory from '~/components/ChildrenCategory';
import Product from '~/components/Product';

export default function Routes() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none" initialRouteName="Explore">
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="ChildrenCategory" component={ChildrenCategory} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
}
