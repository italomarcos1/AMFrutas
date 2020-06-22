import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '~/services/api';

import Input from '../Input';

import { Container, MenuButton } from './styles';

export default function Header({ result, searching }) {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const handleSearch = useCallback(async () => {
    const encoded = encodeURIComponent(search);
    searching(search);
    try {
      const {
        data: { data },
      } = await api.get(`ecommerce/products?search=${encoded}`);

      if (data.total === 0 && data.data === []) result({ totalResults: 0 });
      else
        result({
          totalResults: data.total,
          results: data.data,
        });

      setSearch('');
    } catch (err) {
      setSearch('');
    }
  }, [search, result]);

  return (
    <Container>
      <MenuButton
        onPress={() => navigation.navigate('Menu')}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon size={35} name="menu" color="#fff" />
      </MenuButton>
      <Input
        icon="search"
        style={{ marginRight: 10, borderRadius: 20 }}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Pesquisar produtos"
        returnKeyType="send"
        onSubmitEditing={handleSearch}
        value={search}
        onChangeText={setSearch}
      />
    </Container>
  );
}
