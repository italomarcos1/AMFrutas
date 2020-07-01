import React, { useEffect, useState } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Toast from 'react-native-tiny-toast';

import Header from '~/components/Header';
import Search from '~/components/Search';

import ProductsScreen from '~/pages/App/Products';
import PromotionsScreen from '~/pages/App/Promotions';
import DeliveriesScreen from '~/pages/App/Deliveries';
import TipsScreen from '~/pages/App/Tips';

import { showTabBar } from '~/store/modules/user/actions';

import {
  TransparentBackground,
  SearchingContainer,
  SearchingText,
} from './styles';

export default function Home() {
  const Tab = createMaterialTopTabNavigator();
  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  useEffect(() => {
    dispatch(showTabBar());
  }, []);

  return (
    <>
      <Header
        searching={value => {
          setSearch(value);
          setSearching(true);
        }}
        result={({ totalResults, results }) => {
          if (totalResults !== 0) {
            setSearching(false);
            setSearchResults(results);
            setTotal(totalResults);
            setSearchModalVisible(true);
          } else {
            setSearching(false);
            Toast.show(`Não encontramos nenhum item relacionado à sua busca.`);
          }
        }}
      />

      <Tab.Navigator
        initialRouteName="Produtos"
        tabBarOptions={{
          activeTintColor: '#000',
          inactiveTintColor: '#999',
          style: {
            height: 45,
            justifyContent: 'space-evenly',
          },
          labelStyle: { fontSize: 13, textTransform: 'capitalize' },
          indicatorStyle: { backgroundColor: '#12b118', height: 4 },
        }}
      >
        <Tab.Screen name="Produtos" component={ProductsScreen} />
        <Tab.Screen name="Promoções" component={PromotionsScreen} />
        <Tab.Screen name="Entregas" component={DeliveriesScreen} />
        <Tab.Screen name="Dicas" component={TipsScreen} />
      </Tab.Navigator>

      <Modal
        visible={searching}
        onRequestClose={() => setSearching(false)}
        transparent
      >
        <TransparentBackground>
          <SearchingContainer>
            <SearchingText>
              {`Pesquisando por '${search.toUpperCase()}', aguarde...`}
            </SearchingText>
            <ActivityIndicator size="large" color="#777" />
          </SearchingContainer>
        </TransparentBackground>
      </Modal>
      <Search
        open={searchModalVisible}
        closeModal={() => setSearchModalVisible(false)}
        products={searchResults}
        total={total}
        search={search}
      />
    </>
  );
}
