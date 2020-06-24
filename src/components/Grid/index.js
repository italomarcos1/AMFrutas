import React from 'react';
import PropTypes from 'prop-types';

import { StatusBar, FlatList } from 'react-native';

import { Container } from './styles';

import Item from '../Item';
import CustomItem from '../CustomItem';

export default function Grid({ data, isCategory, isProduct, isBlog, ...rest }) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12b118" />

      <Container>
        <FlatList
          {...rest}
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={2}
          style={{ flex: 1, height: 900 }}
          keyExtractor={item => String(item.id)} //eslint-disable-line
          renderItem={({ item }) =>
            isProduct ? (
              <CustomItem item={item} />
            ) : (
              <Item item={item} isCategory={isCategory} isBlog={isBlog} />
            )
          }
        />
      </Container>
    </>
  );
}

Grid.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  isCategory: PropTypes.bool,
  isProduct: PropTypes.bool,
  isBlog: PropTypes.bool,
};

Grid.defaultProps = {
  isCategory: false,
  isProduct: false,
  isBlog: false,
};
