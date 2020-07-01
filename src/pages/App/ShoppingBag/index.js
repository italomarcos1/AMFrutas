import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StatusBar, Text, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-tiny-toast';

import {
  Container,
  ProductsList,
  NoFavoriteProducts,
  NoFavoriteProductsContainer,
  ProductItem,
  ProductImage,
  FinishButton,
  FinishButtonText,
  ProductInfo,
  ProductName,
  ProductPrice,
  PurchaseConfirmationContainer,
  PurchaseConfirmationModal,
  RateContainer,
  Detail,
  FareDetails,
  Price,
  IconContainer,
  Zipcode,
  Separator,
} from './styles';

import Header from '~/components/HeaderMenu';

import api from '~/services/api';

import PurchaseConfirmation from '~/assets/purchase-confirmation.svg';
import Shipping from '~/assets/ico-shipping.svg';

import { cleanCart, removeFromCartRequest } from '~/store/modules/cart/actions';
import { hideTabBar, showTabBar } from '~/store/modules/user/actions';

import Button from '~/components/Button';

Icon.loadFont();

export default function ShoppingBag() {
  const products = useSelector(state => state.cart.products);
  const signed = useSelector(state => state.auth.signed);
  const user = useSelector(state => state.user.profile);

  const [visible, setModalVisible] = useState(false);
  const [cost, setCost] = useState(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
    dispatch(showTabBar());
  };

  const handleRemoveFromCart = useCallback(
    id => {
      dispatch(removeFromCartRequest(id));
    },
    [dispatch]
  );

  useEffect(() => {
    async function loadCost() {
      const {
        data: { data },
      } = await api.get('checkout/shipping-cost');

      setCost(data);
      dispatch(hideTabBar());
    }
    loadCost();
    dispatch(hideTabBar());
  }, []);

  const handleFinish = useCallback(async () => {
    if (!signed) {
      Toast.show('Você deve logar ou se cadastrar antes de fazer compras.');
      navigation.navigate('Account');
    } else {
      setModalVisible(true);
      await api.post('checkout', {
        shipping_address: {
          zipcode: 123456789,
          address: 'Rua do Dolar',
          district: 'Centro',
          city: 'Rio de Janeiro',
          state: 'Rio de Janeiro',
        },
      });
    }
  }, [dispatch, signed, navigation]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12b118" />

      <Container>
        <Header title="Cesto de compras" close={handleGoBack} custom={true} />
        {products.length !== 0 ? (
          <>
            <View style={{ flex: 1, padding: 10 }}>
              <ProductsList
                data={products}
                keyExtractor={product => String(product.id)}
                renderItem={({ item: product }) => (
                  <ProductItem onPress={() => {}}>
                    <ProductImage
                      source={{ uri: product.options.product.thumbs }}
                    />
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductPrice>{`€ ${product.price}`}</ProductPrice>
                      <RateContainer>
                        <View style={{ flex: 0.5, flexDirection: 'row' }}>
                          <Text style={{ fontSize: 14 }}>Quantidade: </Text>
                          <Text style={{ fontSize: 14 }}>{product.qty}</Text>
                        </View>
                        <View style={{ flex: 0.3, flexDirection: 'row' }}>
                          <TouchableOpacity
                            onPress={() => handleRemoveFromCart(product.rowId)}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Text
                              numberOfLines={2}
                              style={{ color: '#c30', marginRight: 2 }}
                            >
                              Remover
                            </Text>
                            <Icon name="x-square" size={20} color="#c30" />
                          </TouchableOpacity>
                        </View>
                      </RateContainer>
                    </ProductInfo>
                  </ProductItem>
                )}
              />

              <Separator />
              <Detail>
                <IconContainer>
                  <Shipping height={45} width={45} />
                </IconContainer>

                <FareDetails>
                  <Text style={{ fontSize: 14 }}>Frete</Text>
                  <Zipcode>
                    {user.default_address !== []
                      ? user.default_address.zipcode
                      : '71880-662'}
                  </Zipcode>
                </FareDetails>

                <Price>{`€ ${cost}`}</Price>
              </Detail>
            </View>
            <FinishButton notSigned={!signed} onPress={handleFinish}>
              <FinishButtonText>Finalizar compra</FinishButtonText>
            </FinishButton>
          </>
        ) : (
          <NoFavoriteProductsContainer>
            <NoFavoriteProducts>
              Você não adicionou nenhum produto à cesta ainda.
            </NoFavoriteProducts>
          </NoFavoriteProductsContainer>
        )}
        <Modal
          visible={visible}
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <PurchaseConfirmationModal>
            <PurchaseConfirmationContainer>
              <PurchaseConfirmation width={250} height={250} />
              <Text style={{ color: '#333', fontSize: 26, marginTop: 15 }}>
                Parabéns pela compra!
              </Text>
              <Button
                style={{
                  borderRadius: 15,
                  height: 45,
                  backgroundColor: '#12b118',
                }}
                onPress={() => setModalVisible(false)}
              >
                Retornar para o aplicativo
              </Button>
            </PurchaseConfirmationContainer>
          </PurchaseConfirmationModal>
        </Modal>
      </Container>
    </>
  );
}
