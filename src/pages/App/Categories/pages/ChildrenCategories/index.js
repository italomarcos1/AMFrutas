import React from 'react';
import { FlatList } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import PropTypes from 'prop-types';

import CategoryItem from '~/components/CategoryItem';
import BreadCrumb from '~/components/BreadCrumb';

import { Container } from './styles';

export default function ChildrenCategories({ route }) {
  const { items, name } = route.params;

  const generatePlaceholderBoxes = numItems => {
    const list = [];

    let i = 0;
    while (i < numItems) {
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
      <BreadCrumb name={name} />
      <Container>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={items}
          numColumns={2}
          style={{ flex: 1, width: '100%' }}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <CategoryItem
              isCategory={item.all_children_categories.length !== 0}
              item={item}
            />
          )}
        />
      </Container>
    </>
  );
}

ChildrenCategories.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      items: PropTypes.oneOfType([PropTypes.array]),
      name: PropTypes.string,
    }),
  }).isRequired,
};
