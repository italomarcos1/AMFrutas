import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, Modal, View, Text, ActivityIndicator } from 'react-native';
import Toast from 'react-native-tiny-toast';

import Header from '~/components/Header';
import Grid from '~/components/Grid';
import Search from '~/components/Search';

import api from '~/services/api';

import { Container, LoadingText, LoadingContainer, Loading } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(3);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [visible, setModalVisible] = useState(false);

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
    setFirstLoad(true);
    setPage(1);
    setLastPage(3);
    loadProducts();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1eb118" />
      <Header
        searching={value => {
          setSearch(value);
          setSearching(true);
        }}
        result={({ totalResults, results }) => {
          if (totalResults !== 0) {
            setSearching(false);

            setSearchResults(results);
            setTotal(totalResults);
            setModalVisible(true);
          } else {
            setSearching(false);
            Toast.show(`Não encontramos nenhum item relacionado à sua busca.`);
          }
        }}
      />
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
      <Modal
        visible={searching}
        onRequestClose={() => setSearching(false)}
        transparent
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: 120,
              width: 270,
              paddingVertical: 20,
              paddingHorizontal: 10,
              backgroundColor: '#ddd',
              alignItems: 'center',
              borderRadius: 8,
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#333',
                textAlign: 'center',
                marginBottom: 5,
              }}
            >
              {`Pesquisando por '${search.toUpperCase()}', aguarde...`}
            </Text>
            <ActivityIndicator size="large" color="#777" />
          </View>
        </View>
      </Modal>
      <Search
        open={visible}
        closeModal={() => setModalVisible(false)}
        products={searchResults}
        total={total}
        search={search}
      />
    </>
  );
}
