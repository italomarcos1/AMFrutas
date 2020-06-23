import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, Text } from 'react-native';

import { Container } from './styles';

import api from '~/services/api';

import OrderInfo from './components/OrderInfo';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noTransactions, setNoTransactions] = useState(false);

  useEffect(() => {
    async function loadTransactions() {
      try {
        setLoading(true);

        const { data } = await api.get('clients/transactions');

        if (data.meta.message === 'Não há compras recentes.') {
          setNoTransactions(true);
        } else {
          setTransactions(data.data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    loadTransactions();
  }, []);

  return (
    <>
      <Container style={{ padding: 10, paddingBottom: 40 }}>
        {loading && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#333" />
          </View>
        )}
        {!loading && !noTransactions && (
          <FlatList
            style={{
              flex: 1,
              backgroundColor: '#f2f3f4',
              borderColor: '#f0f',
              borderWith: 5,
            }}
            data={transactions}
            keyExtractor={transaction => String(transaction.id)}
            renderItem={({ item: transaction }) => (
              <OrderInfo transaction={transaction} />
            )}
          />
        )}
        {!loading && noTransactions && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#333',
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >
              Você ainda não efetuou nenhuma compra.
            </Text>
          </View>
        )}
      </Container>
    </>
  );
}
