import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import Grid from '~/components/Grid';

import api from '~/services/api';

import {
  Container,
  Header,
  SubContainer,
  TitleContainer,
  Title,
  LoadingText,
  LoadingContainer,
  Loading,
} from './styles';

import Logo from '~/assets/logo-white.svg';

export default function Category({ route, navigation }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(3);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id, title } = route.params;

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
      <Header>
        <SubContainer>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon size={35} name="chevron-left" color="#EEE" />
          </TouchableOpacity>
          <Logo />
        </SubContainer>
      </Header>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
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
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  }).isRequired,
};
