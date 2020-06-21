import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { AddItemToCart, Item, Shirt, ShirtImage, ShirtInfo } from './styles';

import api from '~/services/api';

export default function OrderItem({ product }) {
  return (
    <Item>
      <Shirt>
        <ShirtImage
          source={{
            uri:
              'https://2.bp.blogspot.com/-dZNDyYvV0u4/VPuntd8jloI/AAAAAAAAAM8/GR056RmQ7so/s1600/Manchester%2BUnited%2B-%2BHome%2B-%2B2008-2009.png',
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
