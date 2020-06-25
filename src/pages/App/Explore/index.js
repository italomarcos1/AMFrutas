import React, { useState } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Toast from 'react-native-tiny-toast';
import Header from '~/components/Header';
import Search from '~/components/Search';

import Promotions from './Promotions';
import Stores from './Stores';
import Deliveries from './Deliveries';
import Tips from './Tips';

import {
  TransparentBackground,
  SearchingContainer,
  SearchingText,
} from './styles';

export default function Explore() {
  const Tab = createMaterialTopTabNavigator();

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [searching, setSearching] = useState(false);
  const [visible, setModalVisible] = useState(false);

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
            setModalVisible(true);
          } else {
            setSearching(false);
            Toast.show(`Não encontramos nenhum item relacionado à sua busca.`);
          }
        }}
      />
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
        open={visible}
        closeModal={() => setModalVisible(false)}
        products={searchResults}
        total={total}
        search={search}
      />
    </>
  );
}
