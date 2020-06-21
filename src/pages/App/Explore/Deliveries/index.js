import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Grid from '~/components/Grid';
import api from '~/services/api';

import { Container, LoadingContainer, Loading, LoadingText } from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(3);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadDeliveries = useCallback(async () => {
    if (page > lastPage) return;

    setLoading(true);

    const {
      data: { data },
    } = await api.get(`blog/categories/6/contents?page=${page}`);

    setDeliveries([...deliveries, ...data.data]);
    setPage(page + 1);
    setLastPage(data.last_page);
    setLoading(false);
    setFirstLoad(false);
  }, [page, lastPage, deliveries]);

  useEffect(() => {
    setFirstLoad(true);
    setPage(1);
    setLastPage(3);
    loadDeliveries();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12b118" />

      <Container>
        {firstLoad ? (
          <LoadingContainer>
            <Loading />
            <LoadingText>Carregando meios de entrega...</LoadingText>
          </LoadingContainer>
        ) : (
          <Grid
            onEndReached={() => loadDeliveries()}
            onEndReachedTreshold={0.3}
            ListFooterComponent={
              loading && <Loading style={{ marginTop: 25 }} />
            }
            data={deliveries}
          />
        )}
      </Container>
    </>
  );
}
