import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { AddItemToCart, Item, Shirt, ShirtImage, ShirtInfo } from './styles';

export default function OrderItem({ product }) {
  return (
    <Item>
      <Shirt>
        <ShirtImage
          source={{
            uri: product.thumbs,
          }}
        />

        <ShirtInfo>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{product.title}</Text>
            <Text style={{ fontSize: 15 }}>Quantidade: {product.quantity}</Text>
            <Text style={{ fontSize: 15 }}>R$ {product.unit_price}</Text>
          </View>
        </ShirtInfo>
      </Shirt>
    </Item>
  );
}
