import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-tiny-toast';
import {
  Container,
  Content,
  CheckoutContainer,
  FinishButton,
  Detail,
  CustomerInfo,
  DetailsContainer,
  Separator,
  Value,
} from './styles';

import api from '~/services/api';

import OrderItem from './components/OrderItem';

export default function Details({ navigation, route }) {
  const goBack = () => {
    navigation.goBack();
  };

  const user = useSelector(state => state.user.profile);

  const { id } = route.params;

  const [transaction, setTransaction] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadInfo() {
      try {
        const { data } = await api.get(`clients/transactions/${id}`);

        console.tron.log(data.products);
        setProducts(data.products);

        delete data.products;

        console.tron.log(data);
        setTransaction(data);
      } catch (err) {
        Toast.show('Houve um erro ao carregar os dados da compra.');
      }
    }
    loadInfo();
  }, []);

  return (
    <>
      <Container
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <DetailsContainer>
          <FlatList
            style={{ flex: 1 }}
            data={products}
            keyExtractor={product => String(product.id)}
            renderItem={({ item: product }) => <OrderItem product={product} />}
          />
          <OrderItem close={goBack} />
          <Separator />
          <View>
            <Detail>
              <Content>Frete</Content>
              <Value>{`€ ${transaction.shipping}`}</Value>
            </Detail>
            <Separator />
            <Detail>
              <Content>Cupom</Content>
              <Value>- - -</Value>
            </Detail>
            <Separator />
            <Detail>
              <Content>Total</Content>
              <Value>{`€ ${transaction.total}`}</Value>
            </Detail>
          </View>
          <Separator />

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
            <View
              style={{
                flex: 1,
                marginBottom: 20,
                justifyContent: 'space-evenly',
              }}
            >
              <Content>{user.default_address}</Content>
              <Value>{`${user.default_address.address} ${user.default_address.number}`}</Value>
              <Value>{`${user.default_address.zipcode} ${user.default_address.city} ${user.default_address.state}`}</Value>
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
                <Text style={{ fontWeight: 'bold' }}>Estado da encomenda</Text>
                <Text style={{ color: '#F06D85', fontWeight: 'bold' }}>
                  {transaction.current_status}
                </Text>
              </Detail>
              <Detail>
                <Text style={{ fontWeight: 'bold' }}>Método de pagamento</Text>
                <Text style={{ color: '#11CE19', fontWeight: 'bold' }}>
                  {transaction.payment_method}
                </Text>
              </Detail>
              <Detail>
                <Text style={{ fontWeight: 'bold' }}>Estado de pagamento</Text>
                <Text style={{ color: '#11CE19', fontWeight: 'bold' }}>
                  {transaction.current_status}
                </Text>
              </Detail>
              <Detail>
                <Text style={{ fontWeight: 'bold' }}>Data da encomenda</Text>
                <Text style={{ color: '#11CE19', fontWeight: 'bold' }}>
                  {transaction.created_at}
                </Text>
              </Detail>
            </View>
          </View>
        </DetailsContainer>
      </Container>
    </>
  );
}
