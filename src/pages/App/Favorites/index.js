import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  FavoritesList,
  Header,
  NoFavoriteProducts,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  // Rate,
  // RateContainer,
} from './styles';

// import Product from '~/components/Product';
import { showTabBar } from '~/store/modules/user/actions';

export default function Favorites() {
  const favorites = useSelector(state => state.cart.favorites);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showTabBar());
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12b118" />

      <Container>
        <Header>Produtos Favoritos</Header>
        {favorites.length !== 0 ? (
          <FavoritesList
            data={favorites}
            keyExtractor={favorite => String(favorite.id)}
            renderItem={({ item }) => (
              <ProductItem
                onPress={() => {
                  navigation.navigate('Product', { item });
                }}
              >
                <ProductImage source={{ uri: item.thumbs }} />
                <ProductInfo>
                  <ProductName>{item.title}</ProductName>
                  <ProductPrice>{`€ ${item.price}`}</ProductPrice>
                  {/* <RateContainer>
                    <Icon name="star" size={12} color="red" />
                    <Rate>{`${item.rate} | ${item.comments} comentários`}</Rate>
                  </RateContainer> */}
                </ProductInfo>
              </ProductItem>
            )}
          />
        ) : (
          <View
            style={{
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <NoFavoriteProducts>
              Você não favoritou nenhum produto ainda.
            </NoFavoriteProducts>
          </View>
        )}
      </Container>
    </>
  );
}
