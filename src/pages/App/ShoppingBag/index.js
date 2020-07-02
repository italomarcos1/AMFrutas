import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, Text, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-tiny-toast';

import EmptyBagIcon from '~/assets/empty-bag.svg';

import {
  Container,
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
  ProductsListContainer,
  EmptyBagContainer,
  EmptyBagText,
  EmptyBagTitle,
  Detail,
  FareDetails,
  Price,
  IconContainer,
  Zipcode,
} from './styles';

import Header from '~/components/HeaderMenu';

import api from '~/services/api';

import PurchaseConfirmation from '~/assets/purchase-confirmation.svg';
import Shipping from '~/assets/ico-shipping.svg';

import { cleanCart, removeFromCartRequest } from '~/store/modules/cart/actions';
import { showTabBar } from '~/store/modules/user/actions';

import Button from '~/components/Button';

Icon.loadFont();

export default function ShoppingBag() {
  const products = useSelector(state => state.cart.products);
  const signed = useSelector(state => state.auth.signed);
  const user = useSelector(state => state.user.profile);

  const [visible, setModalVisible] = useState(false);
  const [cost, setCost] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
    dispatch(showTabBar());
  };

  const calculateTotalPrice = useCallback(() => {
    const total = products.reduce((totalSum, product) => {
      return totalSum + product.price * product.qty;
    }, 0);

    const formattedPrice = Number(total).toFixed(2);

    setFinalPrice(formattedPrice);
  }, [products]);

  const handleRemoveFromCart = useCallback(
    id => {
      dispatch(removeFromCartRequest(id));
    },
    [dispatch]
  );

  useEffect(() => {
    async function loadCost() {
      const { data } = await api.get('checkout/shipping-cost');

      setCost(data.data);
      setFinalPrice(finalPrice + data.data);
    }
    calculateTotalPrice();
    loadCost();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [products, calculateTotalPrice]);

  const handleFinish = useCallback(async () => {
    if (!signed) {
      Toast.show('Você deve logar ou se cadastrar antes de fazer compras.');
      navigation.navigate('Account');
    } else if (user.default_address.length === 0) {
      Toast.show('Você deve cadastrar um endereço antes de efetuar a compra.');
    } else {
      setModalVisible(true);

      const {
        data: { meta },
      } = await api.post('checkout', {
        shipping_address: user.default_address,
      });

      Toast.showSuccess(meta.message);
      dispatch(cleanCart());
    }
  }, [dispatch, signed, navigation, user]);

  function getPercentDiscountValue(product) {
    const { price, price_promotional } = product;

    return Math.ceil(((price - price_promotional) / price) * 100);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Container>
        <Header title="Cesto de compras" close={handleGoBack} custom={true} />

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
                          '0.00' ? (
                            <>
                              <OldPrice>
                                € {product.options.product.price}
                              </OldPrice>

                              <CurrentPrice>
                                € {product.price.toFixed(2)}
                              </CurrentPrice>

                              <DiscountPercent>{`-${getPercentDiscountValue(
                                product.options.product
                              )}%`}</DiscountPercent>
                            </>
                          ) : (
                            <CurrentPrice>
                              € {product.price.toFixed(2)}
                            </CurrentPrice>
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

              <Detail>
                <IconContainer>
                  <Shipping height={45} width={45} />
                </IconContainer>

                <FareDetails>
                  <Text style={{ fontSize: 14 }}>Porte</Text>
                  <Zipcode>
                    {user.default_address !== []
                      ? user.default_address.zipcode
                      : 'Nenhum endereço cadastrado.'}
                  </Zipcode>
                </FareDetails>

                <Price>
                  {user.default_address !== []
                    ? `€ ${cost.toFixed(2)}`
                    : `€ 0.00`}
                </Price>
              </Detail>
            </ProductsListContainer>

            <FinishButton notSigned={!signed} onPress={handleFinish}>
              <FinishButtonText>
                {`Finalizar compra | € ${(Number(finalPrice) + cost).toFixed(
                  2
                )}`}
              </FinishButtonText>
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
