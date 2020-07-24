import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EmptyListIcon from '~/assets/empty-wishlist.svg';

import ProductItem from '~/components/ProductItem';
import Header from '~/components/HeaderMenu';

import AuthScreen from '~/pages/Auth';

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
  const signed = useSelector(state => state.auth.signed);

  const favorites = useSelector(state => state.cart.favorites);

  const [apiFavorites, setApiFavorites] = useState(favorites);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loadFavorites = useCallback(async () => {
    const {
      data: { data },
    } = await api.get('clients/wishlists');

    setApiFavorites(data); // se os favoritos da api forem diferentes do local, o da api prevalece
    setLoading(false);
  }, []);

  useEffect(() => {
    if (signed) {
      // carrega os favoritos assim que o componente é montado
      dispatch(showTabBar());
      dispatch(resetTrigger());

      loadFavorites();
    }
  }, []);

  useEffect(() => {
    if (signed) loadFavorites(); // quando o array de favoritos (local, no Redux) muda, busca da API quando o componente for montado
  }, [favorites, signed]);

  const closeModal = async () => {
    navigation.goBack();
  };

  if (!signed) return <AuthScreen closeModal={closeModal} />;

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
