import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HTML from 'react-native-render-html';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Logo from '~/assets/logo-white.svg';

import { Container, Header, Title, TitleContainer } from './styles';

Icon.loadFont();

export default function Content({ navigation, route }) {
  const [pageInfo, setPageInfo] = useState(
    '<div style="align-items:center"><h3 style="color: #999">Carregando...</h1></div>'
  );
  const { endpoint, title } = route.params;

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`${endpoint}`);

      setPageInfo(response.data.data.description);
    }

    loadData();
  }, []);

  return (
    <>
      <Header>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon size={35} name="arrow-left" color="#EEE" />
        </TouchableOpacity>
        <Logo />
      </Header>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <Container>
        <ScrollView
          contentContainerStyle={{
            height: 5000,
            paddingHorizontal: 10,
            paddingTop: 30,
          }}
        >
          <HTML html={pageInfo} />
        </ScrollView>
      </Container>
    </>
  );
}

Content.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      endpoint: PropTypes.string,
      title: PropTypes.string,
    }),
  }).isRequired,
};
