import React, { useState } from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Toast from 'react-native-tiny-toast';
import Header from '~/components/Header';
import Search from '~/components/Search';

import Promotions from './Promotions';
import Stores from './Stores';
import Deliveries from './Deliveries';
import Tips from './Tips';

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
        <View
          style={{
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: 120,
              width: 270,
              paddingVertical: 20,
              paddingHorizontal: 10,
              backgroundColor: '#ddd',
              alignItems: 'center',
              borderRadius: 8,
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#333',
                textAlign: 'center',
                marginBottom: 5,
              }}
            >
              {`Pesquisando por '${search.toUpperCase()}', aguarde...`}
            </Text>
            <ActivityIndicator size="large" color="#777" />
          </View>
        </View>
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
