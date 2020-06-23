import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-tiny-toast';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  ContainerImage,
  ProductInfo,
  ProductImage,
  ProductText,
  ProductPrice,
} from './styles';

import {
  addToFavoritesRequest,
  removeFromFavoritesRequest,
} from '~/store/modules/cart/actions';

Icon.loadFont();

export default function CustomItem({ item }) {
  const signed = useSelector(state => state.auth.signed);
  const updating = useSelector(state => state.cart.updating);

  const product = useSelector(state => {
    return !!state.cart.favorites[item.id];
  });

  console.tron.log(product);

  const [favorite, setFavorite] = useState(product);
  const [pressed, setPressed] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (signed && pressed) {
      if (favorite) {
        dispatch(removeFromFavoritesRequest(item.id));
      } else {
        dispatch(addToFavoritesRequest(item.id));
      }
    }
    setPressed(false);
  }, [favorite, dispatch, item.id, signed, pressed]);

  return (
    <ContainerImage onPress={() => navigation.navigate('Product', { item })}>
      <ProductImage
        imageStyle={{
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        source={{ uri: item.thumbs }}
      >
        <TouchableOpacity
          disabled={updating}
          style={{ margin: 5 }}
          onPress={() => {
            if (signed) {
              setPressed(true);
              () => setFavorite(!favorite);
            } else {
              Toast.show(
                'Você deve logar ou se cadastrar para poder favoritar produtos.'
              );

              navigation.navigate('Account');
            }
          }}
          hitSlop={{ top: 3, bottom: 3, left: 3, right: 3 }}
        >
          {favorite ? (
            <Icon name="favorite" color="#f53030" size={30} />
          ) : (
            <Icon name="favorite-border" color="#f53030" size={30} />
          )}
        </TouchableOpacity>
      </ProductImage>
      <ProductInfo>
        <ProductText>{item.title}</ProductText>
        <ProductPrice>{`€ ${item.price}`}</ProductPrice>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
          }}
        >
          {/* <Rate>
            <Icon name="star" size={10} color="red" />
            {`${item.rate} | ${item.comments} comentários`}
          </Rate> */}
        </View>
      </ProductInfo>
    </ContainerImage>
  );
}

CustomItem.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
