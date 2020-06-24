import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';

import {
  Container,
  Content,
  Detail,
  DetailStatus,
  DetailField,
  CustomerInfo,
  DetailsContainer,
  Separator,
  Value,
  Price,
} from './styles';

import api from '~/services/api';

import OrderItem from './components/OrderItem';

export default function Details({ route }) {
  const user = useSelector(state => state.user.profile);

  const { id, created } = route.params;

  const [transaction, setTransaction] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInfo() {
      try {
        const {
          data: { data },
        } = await api.get(`clients/transactions/${id}`);

        setShippingAddress(data.shipping_address);
        delete data.shipping_address;

        setProducts(data.products);

        delete data.products;

        setTransaction(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        Toast.show('Houve um erro ao carregar os dados da compra.');
      }
    }
    loadInfo();
  }, []);

  console.tron.log(`created: ${created}`);

  return (
    <>
      <Container
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {loading ? (
          <ActivityIndicator color="#333" size="large" />
        ) : (
          <DetailsContainer>
            <FlatList
              style={{ flex: 1 }}
              data={products}
              keyExtractor={product => String(product.id)}
              renderItem={({ item }) => <OrderItem product={item} />}
            />
            <Separator style={{ marginTop: 30 }} />
            <View>
              <Detail>
                <Content>Frete</Content>
                <Price>{`€ ${transaction.shipping}`}</Price>
              </Detail>
              <Detail>
                <Content>Cupom</Content>
                <Value>- - -</Value>
              </Detail>
              <Detail>
                <Content>Total</Content>
                <Price>{`€ ${transaction.total}`}</Price>
              </Detail>
            </View>
            <Separator style={{ marginTop: 30 }} />

            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingTop: 10,
                paddingHorizontal: 5,
              }}
            >
              <View
                style={{
                  height: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Content>Envio para:</Content>
                <Text />
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <CustomerInfo>
                  <Content>Nome: </Content>
                  <Value>{`${user.name} ${user.last_name}`}</Value>
                </CustomerInfo>
                <CustomerInfo>
                  <Content>Email: </Content>
                  <Value>{user.email}</Value>
                </CustomerInfo>
                <CustomerInfo>
                  <Content>CPF: </Content>
                  <Value>{user.document}</Value>
                </CustomerInfo>
                <CustomerInfo>
                  <Content>Celular: </Content>
                  <Value>{user.cellphone}</Value>
                </CustomerInfo>
              </View>
              <Separator style={{ marginVertical: 10 }} />

              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                  marginBottom: 25,
                  justifyContent: 'space-evenly',
                }}
              >
                <Content>{shippingAddress.address}</Content>
                <Value>{`${shippingAddress.address} ${shippingAddress.district}`}</Value>
                <Value
                  numberOfLines={2}
                >{`${shippingAddress.zipcode} ${shippingAddress.city} - ${shippingAddress.state}`}</Value>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                borderTopColor: '#ccc',
                borderTopWidth: 1,
                backgroundColor: '#fff',
              }}
            >
              <View style={{ paddingVertical: 10 }}>
                <Detail>
                  <DetailField>Estado da encomenda</DetailField>
                  <DetailStatus status={false}>
                    {transaction.current_status}
                  </DetailStatus>
                </Detail>
                <Detail>
                  <DetailField>Método de pagamento</DetailField>
                  <DetailStatus status>
                    {transaction.payment_method}
                  </DetailStatus>
                </Detail>
                <Detail>
                  <DetailField>Estado de pagamento</DetailField>
                  <DetailStatus status={false}>
                    {transaction.current_status}
                  </DetailStatus>
                </Detail>
                <Detail>
                  <DetailField>Data da encomenda</DetailField>
                  <DetailStatus status>{created}</DetailStatus>
                </Detail>
              </View>
            </View>
          </DetailsContainer>
        )}
      </Container>
    </>
  );
}

Details.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
