import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import Grid from '~/components/Grid';

import { Container, LoadingContainer, Loading, LoadingText } from './styles';

// import fakeapi from '~/services/fakeapi';
import api from '~/services/api';

export default function Tips() {
  const [tips, setTips] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(3);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadTips = useCallback(async () => {
    if (page > lastPage) return;

    setLoading(true);

    const {
      data: { data },
    } = await api.get(`blog/categories/5/contents?page=${page}`);

    setTips([...tips, ...data.data]);
    setPage(page + 1);
    setLastPage(data.last_page);
    setLoading(false);
    setFirstLoad(false);
  }, [page, lastPage, tips]);

  useEffect(() => {
    setFirstLoad(true);
    setPage(1);
    setLastPage(3);
    loadTips();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12b118" />

      <Container>
        {firstLoad ? (
          <LoadingContainer>
            <Loading />
            <LoadingText>Carregando dicas...</LoadingText>
          </LoadingContainer>
        ) : (
          <Grid
            onEndReached={() => loadTips()}
            onEndReachedTreshold={0.3}
            ListFooterComponent={
              loading && <Loading style={{ marginTop: 25 }} />
            }
            data={tips}
          />
        )}
      </Container>
    </>
  );
}
