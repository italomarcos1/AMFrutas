import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import api from '~/services/api';
import { showTabBar } from '~/store/modules/user/actions';

import CategoryItem from '~/components/CategoryItem';

import { Container } from './styles';

export default function Categories() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(3);
  const [loading, setLoading] = useState(false);

  const loadCategories = useCallback(async () => {
    if (page > lastPage) return;
    setLoading(true);

    const {
      data: { data },
    } = await api.get(
      'ecommerce/categories/?recursively=1&per_page=13&order_field=slug&order_direction=asc'
    );

    setCategories([...categories, ...data.data]);
    setPage(page + 1);
    setLastPage(data.last_page);
    setLoading(false);
  }, [page, lastPage, categories]);

  useEffect(() => {
    dispatch(showTabBar());
    setPage(1);
    setLastPage(3);
    loadCategories();
  }, []);

  const generatePlaceholderBoxes = numItens => {
    const list = [];

    let i = 0;
    while (i < numItens) {
      list.push({
        key: `box${i}`,
        width: '47%',
        height: 130,
        marginVertical: 10,
        marginBottom: 6,
      });
      i += 1;
    }

    return list;
  };

  return (
    <>
      <Container>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={categories}
          numColumns={2}
          style={{ flex: 1, width: '100%' }}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CategoryItem item={item} />}
          onEndReached={() => loadCategories()}
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
              layout={generatePlaceholderBoxes(8)}
            />
          }
        />
      </Container>
    </>
  );
}
