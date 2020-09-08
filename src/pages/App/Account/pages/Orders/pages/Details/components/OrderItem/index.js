import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Item,
  ItemImage,
  ItemInfo,
  ProductTitle,
  Row,
  Value,
  Label,
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

          <Row>
            <Label>Quantidade:</Label>
            <Value color="#665" size={15}>
              {product.quantity}
            </Value>
          </Row>

          <Row>
            <Label>Preço unitário:</Label>
            <Value color="#ff9000" size={16}>
              € {product.unit_price}
            </Value>
          </Row>

          <Row>
            <Label>Subtotal:</Label>
            <Value>
              € {(product.unit_price * product.quantity).toFixed(2)}
            </Value>
          </Row>
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
