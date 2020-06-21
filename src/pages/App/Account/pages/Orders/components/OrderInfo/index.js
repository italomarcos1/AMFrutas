import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  DeliveryStatus,
  Info,
  Item,
  Order,
  OrderNumberContainer,
  ContentContainer,
  Content,
  Details,
  ShippingDetails,
  ShippingStatus,
} from './styles';

export default function OrderInfo({ transaction }) {
  const navigation = useNavigation();

  return (
    <Info>
      <Item>
        <OrderNumberContainer>
          <ContentContainer>
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
              {`Encomenda ${transaction.id}`}
            </Text>
          </ContentContainer>
        </OrderNumberContainer>

        <Order>
          <ContentContainer>
            <Content>Produtos</Content>
            <Content>{`€ ${transaction.total}`}</Content>
          </ContentContainer>

          <ContentContainer>
            <Content>Frete</Content>
            <Content>{`€ ${transaction.shipping}`}</Content>
          </ContentContainer>

          <ContentContainer>
            <Content>Cupom de desconto</Content>
            <Content>---</Content>
          </ContentContainer>

          <ContentContainer>
            <Content>Total de encomenda</Content>
            <Content>{`€ ${transaction.total + transaction.shipping}`}</Content>
          </ContentContainer>
        </Order>

        <ShippingDetails>
          <DeliveryStatus>
            <Content>Status da Encomenda</Content>
            <ShippingStatus>{transaction.current_status}</ShippingStatus>
          </DeliveryStatus>
        </ShippingDetails>
      </Item>
      <Details
        onPress={() => navigation.navigate('Details', { id: transaction.id })}
      >
        <Text>Detalhes</Text>
      </Details>
    </Info>
  );
}
