import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { ContainerImage, ProductImage, ProductText } from './styles';

export default function Item({ item, isCategory }) {
  const navigation = useNavigation();

  return (
    <ContainerImage
      isCategory={isCategory}
      onPress={() => navigation.navigate('Product', { item })}
    >
      <ProductImage source={{ uri: item.thumbs }} isCategory={isCategory} />
      <ProductText isCategory={isCategory}>{item.title}</ProductText>
    </ContainerImage>
  );
}

Item.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isCategory: PropTypes.bool.isRequired,
};
