import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import api from '~/services/api';

import ContentItem from '~/components/ContentItem';

import { Container } from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(3);
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
  }, [page, lastPage, deliveries]);

  useEffect(() => {
    setPage(1);
    setLastPage(3);
    loadDeliveries();
  }, []);

  const generatePlaceholderBoxes = numItens => {
    const list = [];

    let i = 0;
    while (i < numItens) {
      list.push({
        key: `box${i}`,
        width: '47%',
        height: 200,
        marginVertical: 10,
        marginBottom: 6,
      });
      i += 1;
    }

    return list;
  };

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={deliveries}
        numColumns={2}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <ContentItem item={item} />}
        onEndReached={() => loadDeliveries()}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          <SkeletonContent
            containerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 10,
              paddingTop: 10,
              justifyContent: 'space-between',
            }}
            duration={2000}
            isLoading={loading}
            layout={generatePlaceholderBoxes(6)}
          />
        }
      />
    </Container>
  );
}
