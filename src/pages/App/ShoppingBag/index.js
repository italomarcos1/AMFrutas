import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, Text, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-tiny-toast';

import EmptyBagIcon from '~/assets/empty-bag.svg';

import {
  Container,
  Header,
  HeaderTitle,
  EmptyBagContainer,
  EmptyBagTitle,
  EmptyBagText,
  ProductsListContainer,
  ProductsList,
  ProductItem,
  ProductInfoRow,
  ProductInfoColumn,
  ProductImage,
  ProductTitle,
  PriceContainer,
  OldPrice,
  CurrentPrice,
  DiscountPercent,
  ProductBottomRow,
  RemoveButton,
  RemoveButtonText,
  Quantity,
  Total,
  FinishButton,
  FinishButtonText,
  PurchaseConfirmationContainer,
  PurchaseConfirmationModal,
} from './styles';

import api from '~/services/api';

import PurchaseConfirmation from '~/assets/purchase-confirmation.svg';

import { removeFromCartRequest } from '~/store/modules/cart/actions';
import { showTabBar } from '~/store/modules/user/actions';

import Button from '~/components/Button';

Icon.loadFont();

export default function ShoppingBag() {
  const products = useSelector(state => state.cart.products);
  const signed = useSelector(state => state.auth.signed);
  const [visible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRemoveFromCart = useCallback(
    id => {
      dispatch(removeFromCartRequest(id));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(showTabBar());
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

  function getPercentDiscountValue(product) {
    const { price, price_promotional } = product;

    return Math.ceil(((price - price_promotional) / price) * 100);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Container>
        <Header>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            hitSlop={{
              top: 10,
              left: 10,
              bottom: 10,
              right: 10,
            }}
          >
            <Icon name="chevron-left" color="#000" size={32} />
          </TouchableOpacity>
          <HeaderTitle>Cesto de compras</HeaderTitle>
        </Header>

        {products.length !== 0 ? (
          <>
            <ProductsListContainer>
              <ProductsList
                data={products}
                keyExtractor={product => String(product.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: product }) => (
                  <ProductItem>
                    <ProductInfoRow>
                      <ProductImage
                        source={{ uri: product.options.product.thumbs }}
                      />

                      <ProductInfoColumn>
                        <ProductTitle>{product.name}</ProductTitle>
                        <PriceContainer>
                          {product.options.product.price_promotional !==
                            '0.00' && (
                            <OldPrice>
                              € {product.options.product.price_promotional}
                            </OldPrice>
                          )}

                          <CurrentPrice>
                            € {product.price.toFixed(2)}
                          </CurrentPrice>

                          {product.options.product.price_promotional !==
                            '0.00' && (
                            <DiscountPercent>{`-${getPercentDiscountValue(
                              product.options.product
                            )}%`}</DiscountPercent>
                          )}
                        </PriceContainer>
                      </ProductInfoColumn>
                    </ProductInfoRow>

                    <ProductBottomRow>
                      <RemoveButton
                        onPress={() => handleRemoveFromCart(product.rowId)}
                      >
                        <RemoveButtonText>Excluir</RemoveButtonText>
                        <Icon name="x" size={22} color="#9A9A9A" />
                      </RemoveButton>

                      <Quantity>{product.qty}</Quantity>

                      <Total>
                        € {(product.qty * product.price).toFixed(2)}
                      </Total>
                    </ProductBottomRow>
                  </ProductItem>
                )}
              />
            </ProductsListContainer>

            <FinishButton notSigned={!signed} onPress={handleFinish}>
              <FinishButtonText>Finalizar compra</FinishButtonText>
            </FinishButton>
          </>
        ) : (
          <EmptyBagContainer>
            <EmptyBagIcon width={200} height={200} />
            <EmptyBagTitle>Não há itens no cesto!</EmptyBagTitle>
            <EmptyBagText>
              Por favor, adicione item e volte no cesto de compras.
            </EmptyBagText>
          </EmptyBagContainer>
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
