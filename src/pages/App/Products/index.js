import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '~/components/Grid';

import api from '~/services/api';
import { addFavorites } from '~/store/modules/cart/actions';

import { Container, LoadingText, LoadingContainer, Loading } from './styles';

export default function Products() {
  const signed = useSelector(state => state.auth.signed);
  const favs = useSelector(state => state.cart.favorites);

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(3);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    const {
      data: { data, meta },
    } = await api.get('clients/wishlists');
    if (meta.message === 'Produtos favoritos retornados com sucesso') {
      setFavorites(data);
      dispatch(addFavorites(data));
    } else {
      setFavorites(favs);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    if (page > lastPage) return;
    setLoading(true);

    const {
      data: { data },
    } = await api.get(`ecommerce/products?page=${page}`);

    setProducts([...products, ...data.data]);
    setPage(page + 1);
    setLastPage(data.last_page);
    setLoading(false);
    setFirstLoad(false);
  }, [page, lastPage, products]);

  useEffect(() => {
    loadProducts();
  }, [favorites, favs, signed]);

  useEffect(() => {
    setFirstLoad(true);
    setPage(1);
    setLastPage(3);
    if (signed) {
      loadFavorites();
    }
    loadProducts();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1eb118" />

      <Container>
        {firstLoad ? (
          <LoadingContainer>
            <Loading />
            <LoadingText>Carregando produtos...</LoadingText>
          </LoadingContainer>
        ) : (
          <Grid
            onEndReached={() => loadProducts()}
            onEndReachedTreshold={0.3}
            ListFooterComponent={
              loading && <Loading style={{ marginTop: 25 }} />
            }
            data={products}
            isProduct
          />
        )}
      </Container>
    </>
  );
}
