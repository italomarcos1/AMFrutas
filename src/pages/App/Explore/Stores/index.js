import React, { useEffect, useState } from 'react';
import { View, Dimensions, StatusBar, Text, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

import api from '~/services/api';

export default function Stores() {
  const [page, setPage] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function loadPage() {
      const response = await api.get('blog/contents/7');
      setPage(response.data.data.description);
      setTitle(response.data.data.title);
    }

    loadPage();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12b118" />

      <ScrollView
        contentContainerStyle={{
          height: 3330,
          paddingHorizontal: 10,
          paddingTop: 30,
          backgroundColor: '#F2F2F2',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            textTransform: 'uppercase',
            color: '#12B118',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Text>
        <HTML
          html={page}
          imagesInitialDimensions={{ width: 200, height: 200 }}
          tagsStyles={{
            img: { alignSelf: 'center' },
            strong: { fontSize: 20 },
          }}
          imagesMaxWidth={Dimensions.get('window').width}
        />
      </ScrollView>
    </>
  );
}
