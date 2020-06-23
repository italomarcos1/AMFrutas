import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import HTML from 'react-native-render-html';

import api from '~/services/api';

import { showTabBar } from '~/store/modules/user/actions';

import { Container, Title, Banner } from './styles';

export default function ContentScreen({ route }) {
  const [htmlContent, setHtmlContent] = useState('<div></div>');
  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState('');
  const [contentId] = useState(route.params.contentId);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPage() {
      const response = await api.get(`blog/contents/${contentId}`);
      setHtmlContent(response.data.data.description);
      setTitle(response.data.data.title);
      setBanner(response.data.data.thumbs);
    }

    dispatch(showTabBar());

    loadPage();
  }, []);

  return (
    <>
      <Container>
        {banner !== '' && (
          <Banner
            width={Dimensions.get('window').width - 30}
            height={Math.round((Dimensions.get('window').width * 9) / 16)}
            source={{
              uri: `${banner}`,
            }}
          />
        )}

        <Title>{title}</Title>
        <HTML
          html={htmlContent}
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
