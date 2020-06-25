import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
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
  const [title, setTitle] = useState(route.params.title);

  const { endpoint } = route.params;

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`${endpoint}`);

      setPageInfo(response.data.data.description);
      setTitle(response.data.data.title);
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
        <HTML
          html={pageInfo}
          staticContentMaxWidth={Dimensions.get('window').width - 30}
          imagesInitialDimensions={{
            width: Dimensions.get('window').width - 30,
            height: Math.round((Dimensions.get('window').width * 9) / 16),
          }}
          tagsStyles={{
            img: {
              borderRadius: 10,
              marginBottom: 10,
            },
            p: {
              fontSize: 17,
              marginBottom: 15,
              lineHeight: 30,
            },
            strong: {
              fontSize: 17,
              marginBottom: 15,
              lineHeight: 30,
              fontWeight: 'bold',
            },
            li: {
              fontSize: 17,
              fontWeight: 'bold',
            },
            h1: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            iframe: {
              width: Dimensions.get('window').width - 30,
              height: Math.round((Dimensions.get('window').width * 9) / 16),
            },
          }}
        />
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
