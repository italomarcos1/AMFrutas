import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';

import {
  Container,
  AddToCartButton,
  AddToCartButtonText,
  Content,
  Detail,
  DetailStatus,
  DetailField,
  CustomerInfo,
  DetailsContainer,
  ShippingDetailsContainer,
  ShippingAddressContainer,
  ShippingToContainer,
  Separator,
  Value,
  Info,
  Price,
} from './styles';

import api from '~/services/api';
import { addToCartRequest } from '~/store/modules/cart/actions';

import OrderItem from './components/OrderItem';

export default function Details({ route }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  const { id, created } = route.params;

  const [transaction, setTransaction] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleAddAllToCart() {
    Object.entries(products).map(([key, product]) => {
      const object = {...product};

      delete object.quantity;
      delete object.unit_price;

      const amount = product.quantity;

      dispatch(addToCartRequest(object, amount));
    });

    Toast.showSuccess('Todos os produtos foram\n adicionados ao cesto');
  }

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
            {products.map((item, index) => 
              <OrderItem
                key={item.id}
                last={products.length === index + 1}
                product={item}
              />
            )}
            
            {products.length && (
              <AddToCartButton onPress={() => handleAddAllToCart()}>
                <AddToCartButtonText>Repetir encomenda</AddToCartButtonText>
              </AddToCartButton>
            )}

            <View>
              <Detail>
                <Content>Porte</Content>
                <Price>
                  {transaction.shipping > 0
                    ? `€ ${transaction.shipping.toFixed(2)}`
                    : 'Grátis'}
                </Price>
              </Detail>

              <Detail>
                <Content>Total</Content>
                <Price color="#189000">{`€ ${Number(
                  transaction.total + transaction.shipping
                ).toFixed(2)}`}</Price>
              </Detail>
            </View>

            <Info>
              <ShippingToContainer>
                <Content>Meus dados</Content>

                <Text />
              </ShippingToContainer>

              <View>
                <CustomerInfo>
                  <Content>Nome: </Content>
                  <Value>{`${user.name} ${user.last_name}`}</Value>
                </CustomerInfo>

                <CustomerInfo>
                  <Content>Email: </Content>
                  <Value>{user.email}</Value>
                </CustomerInfo>

                <CustomerInfo>
                  <Content>NIF: </Content>
                  <Value>{user.document}</Value>
                </CustomerInfo>

                <CustomerInfo>
                  <Content>Telemóvel: </Content>
                  <Value>{user.cellphone}</Value>
                </CustomerInfo>
              </View>

              <Separator />

              <ShippingAddressContainer>
                <Content>{shippingAddress.address}</Content>

                <Value>{`${shippingAddress.address} ${shippingAddress.district}`}</Value>

                <Value
                  numberOfLines={2}
                >{`${shippingAddress.zipcode} ${shippingAddress.city} - ${shippingAddress.state}`}</Value>
              </ShippingAddressContainer>
            </Info>

            <ShippingDetailsContainer>
              <Detail>
                <DetailField>Estado da encomenda</DetailField>
                <DetailStatus status={false}>
                  {transaction.current_status}
                </DetailStatus>
              </Detail>

              <Detail>
                <DetailField>Método de pagamento</DetailField>
                <DetailStatus status>{transaction.payment_method}</DetailStatus>
              </Detail>

              <Detail>
                <DetailField>Data da encomenda</DetailField>
                <DetailStatus status>{created}</DetailStatus>
              </Detail>

              <Detail>
                <DetailField>Método de entrega</DetailField>
                <DetailStatus status>
                  {transaction.shipping_method}
                </DetailStatus>
              </Detail>

              {transaction.delivery !== null && (
                <Detail>
                  <DetailField>Entrega agendada para</DetailField>
                  <DetailStatus status>{transaction.delivery}</DetailStatus>
                </Detail>
              )}
            </ShippingDetailsContainer>
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

  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
      created: PropTypes.string,
    }),
  }).isRequired,
};
