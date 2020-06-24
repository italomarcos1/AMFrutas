import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  Item,
  ItemImage,
  ItemInfo,
  ProductTitle,
  ProductPrice,
  ProductAmount,
} from './styles';

export default function OrderItem({ product }) {
  return (
    <Container>
      <Item>
        <ItemImage
          source={{
            uri: product.thumbs,
          }}
        />

        <ItemInfo>
          <ProductTitle numberOfLines={2}>{product.title}</ProductTitle>
          <ProductAmount>Quantidade: {product.quantity}</ProductAmount>
          <View style={{ marginTop: 5 }}>
            <ProductAmount>Preço unitário:</ProductAmount>
            <ProductPrice>€ {product.unit_price}</ProductPrice>
          </View>
        </ItemInfo>
      </Item>
    </Container>
  );
}

OrderItem.propTypes = {
  product: PropTypes.shape({
    thumbs: PropTypes.string,
    title: PropTypes.string,
    quantity: PropTypes.number,
    unit_price: PropTypes.number,
  }).isRequired,
};
