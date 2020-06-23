import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { ContainerImage, ProductImage, ProductText } from './styles';

export default function Item({ item, isCategory, isBlog }) {
  const navigation = useNavigation();

  const { id, title } = item;

  return (
    <ContainerImage
      isCategory={isCategory}
      onPress={() => {
        if (isBlog) {
          navigation.navigate('Content', {
            endpoint: `blog/contents/${id}`,
            title,
          });
        } else {
          navigation.navigate('Product', { item });
        }
      }}
    >
      <ProductImage source={{ uri: item.thumbs }} isCategory={isCategory} />
      <ProductText isBlog isCategory={isCategory}>
        {item.title}
      </ProductText>
    </ContainerImage>
  );
}

Item.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isCategory: PropTypes.bool.isRequired,
  isBlog: PropTypes.bool.isRequired,
};
