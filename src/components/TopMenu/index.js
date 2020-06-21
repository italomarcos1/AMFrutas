import React, { useState } from 'react';

import { Container, Item, ItemText } from './styles';

export default function TopMenu({ select }) {
  const [selected, setSelected] = useState('Promotions');

  return (
    <Container>
      <Item
        onPress={() => {
          select('Promotions');
          setSelected('Promotions');
        }}
        selected={selected === 'Promotions'}
      >
        <ItemText selected={selected === 'Promotions'}>Promoções</ItemText>
      </Item>
      <Item
        onPress={() => {
          select('Stores');
          setSelected('Stores');
        }}
        selected={selected === 'Stores'}
      >
        <ItemText selected={selected === 'Stores'}>Lojas</ItemText>
      </Item>
      <Item
        onPress={() => {
          select('Deliveries');
          setSelected('Deliveries');
        }}
        selected={selected === 'Deliveries'}
      >
        <ItemText selected={selected === 'Deliveries'}>Entregas</ItemText>
      </Item>
      <Item
        onPress={() => {
          select('Tips');
          setSelected('Tips');
        }}
        selected={selected === 'Tips'}
      >
        <ItemText selected={selected === 'Tips'}>Dicas</ItemText>
      </Item>
    </Container>
  );
}
