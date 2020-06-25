import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import Header from '~/components/Header';
import Grid from '~/components/Grid';

import api from '~/services/api';

import { Container, LoadingText, LoadingContainer, Loading } from './styles';

export default function Category({ route }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(3);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = route.params;

  const loadItems = useCallback(async () => {
    if (page > lastPage) return;
    setLoading(true);

    const {
      data: { data },
    } = await api.get(`ecommerce/products?category_id=${id}`);

    setItems([...items, ...data.data]);
    setPage(page + 1);
    setLastPage(data.last_page);
    setLoading(false);
    setFirstLoad(false);
  }, [page, lastPage, items]);

  useEffect(() => {
    setFirstLoad(true);
    setPage(1);
    setLastPage(3);
    loadItems();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1eb118" />
      <Header />
      <Container>
        {firstLoad ? (
          <LoadingContainer>
            <Loading />
            <LoadingText>Carregando categoria...</LoadingText>
          </LoadingContainer>
        ) : (
          <Grid
            onEndReached={() => loadItems()}
            onEndReachedTreshold={0.3}
            ListFooterComponent={
              loading && <Loading style={{ marginTop: 25 }} />
            }
            data={items}
            isProduct
          />
        )}
      </Container>
    </>
  );
}

Category.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
