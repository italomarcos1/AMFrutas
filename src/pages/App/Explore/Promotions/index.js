import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { Container, LoadingContainer, Loading, LoadingText } from './styles';

import Grid from '~/components/Grid';
import api from '~/services/api';

export default function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(3);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPromotions = useCallback(async () => {
    if (page > lastPage) return;
    setLoading(true);

    const {
      data: { data },
    } = await api.get(`ecommerce/products?page=${page}&only_promotional=1`);

    setPromotions([...promotions, ...data.data]);
    setPage(page + 1);
    setLastPage(data.last_page);
    setLoading(false);
    setFirstLoad(false);
  }, [page, lastPage, promotions]);

  useEffect(() => {
    setFirstLoad(true);
    setPage(1);
    setLastPage(3);
    loadPromotions();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12b118" />

      <Container>
        {firstLoad ? (
          <LoadingContainer>
            <Loading />
            <LoadingText>Carregando promoções...</LoadingText>
          </LoadingContainer>
        ) : (
          <Grid
            onEndReached={() => loadPromotions()}
            onEndReachedTreshold={0.3}
            ListFooterComponent={
              loading && <Loading style={{ marginTop: 25 }} />
            }
            data={promotions}
            isCategory={true}
          />
        )}
      </Container>
    </>
  );
}
