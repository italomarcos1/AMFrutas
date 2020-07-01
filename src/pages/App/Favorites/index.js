import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import EmptyListIcon from '~/assets/empty-wishlist.svg';

import ProductItem from '~/components/ProductItem';

import {
  Container,
  FavoritesList,
  Header,
  HeaderTitle,
  EmptyListContainer,
  EmptyListTitle,
  EmptyListText,
} from './styles';

import { showTabBar } from '~/store/modules/user/actions';

export default function Favorites() {
  const favorites = useSelector(state => state.cart.favorites);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showTabBar());
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Container>
        <Header>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            hitSlop={{
              top: 10,
              left: 10,
              bottom: 10,
              right: 10,
            }}
          >
            <Icon name="chevron-left" color="#000" size={32} />
          </TouchableOpacity>
          <HeaderTitle>Produtos Favoritos</HeaderTitle>
        </Header>

        {favorites.length !== 0 ? (
          <FavoritesList
            showsVerticalScrollIndicator={false}
            data={favorites}
            numColumns={2}
            keyExtractor={favorite => String(favorite.id)}
            renderItem={({ item }) => <ProductItem item={item} />}
          />
        ) : (
          <EmptyListContainer>
            <EmptyListIcon width={200} height={200} />
            <EmptyListTitle>Não há itens favoritos!</EmptyListTitle>
            <EmptyListText>Produtos favoritos aparecem aqui.</EmptyListText>
          </EmptyListContainer>
        )}
      </Container>
    </>
  );
}
