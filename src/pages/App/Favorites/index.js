import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EmptyListIcon from '~/assets/empty-wishlist.svg';

import ProductItem from '~/components/ProductItem';
import Header from '~/components/HeaderMenu';

import {
  Container,
  FavoritesList,
  EmptyListContainer,
  EmptyListTitle,
  EmptyListText,
  LoadingContainer,
  Loading,
  LoadingText,
} from './styles';

import api from '~/services/api';
import { showTabBar, resetTrigger } from '~/store/modules/user/actions';

export default function Favorites() {
  const favorites = useSelector(state => state.cart.favorites);

  const [apiFavorites, setApiFavorites] = useState(favorites);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loadFavorites = useCallback(async () => {
    const {
      data: { data },
    } = await api.get('clients/wishlists'); // tá no sandbox

    setApiFavorites(data); // se os favoritos da api forem diferentes do local, o da api prevalece
    setLoading(false);
  }, []);

  useEffect(() => {
    // carrega os favoritos assim que o componente é montado
    dispatch(showTabBar());
    dispatch(resetTrigger());

    loadFavorites();
  }, []);

  useEffect(() => {
    loadFavorites(); // quando o array de favoritos (local, no Redux) muda, busca da API quando o componente for montado
  }, [favorites]);

  if (loading)
    return (
      <>
        <Header
          title="Produtos Favoritos"
          close={() => navigation.navigate('Home')}
          custom={true}
        />
        <Container>
          <LoadingContainer>
            <Loading />
            <LoadingText>Carregando favoritos...</LoadingText>
          </LoadingContainer>
        </Container>
      </>
    );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header
        title="Produtos Favoritos"
        close={() => navigation.navigate('Home')}
        custom={true}
      />
      <Container>
        {favorites.length !== 0 ? (
          <FavoritesList
            showsVerticalScrollIndicator={false}
            data={apiFavorites}
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
