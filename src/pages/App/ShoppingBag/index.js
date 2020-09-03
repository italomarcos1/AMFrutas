import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import EmptyBagIcon from '~/assets/empty-bag.svg';

import api from '~/services/api';

import {
  ActivityIndicatorContainer,
  Container,
  FinishButton,
  FinishButtonText,
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
  Quantity,
  RemoveButton,
  RemoveButtonText,
  Total,
  EmptyBagContainer,
  EmptyBagText,
  EmptyBagTitle,
  TotalLabel,
  TotalPrice,
} from './styles';

import Header from '~/components/HeaderMenu';

import { removeFromCartRequest } from '~/store/modules/cart/actions';
import { showTabBar, resetTrigger } from '~/store/modules/user/actions';

Icon.loadFont();

export default function ShoppingBag() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const products = useSelector(state => state.cart.products);
  const signed = useSelector(state => state.auth.signed);

  const [totalBag, setTotalBag] = useState(0);
  const [loadingBag, setLoadingBag] = useState(false);

  const [minimalPurchaseValue, setMinimalPurchaseValue] = useState(0);
  const [canContinue, setCanContinue] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(showTabBar());
    }, [])
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const calculateTotalPrice = useCallback(() => {
    const total = products.reduce((totalSum, product) => {
      return totalSum + product.price * product.qty;
    }, 0);

    const formattedPrice = Number(total).toFixed(3);

    setTotalBag(formattedPrice);
  }, [products]);

  const handleRemoveFromCart = useCallback(
    async id => {
      setLoadingBag(true);

      await dispatch(removeFromCartRequest(id));

      setTimeout(() => {
        setLoadingBag(false);
      }, 200);
    },
    [dispatch]
  );

  const retrieveMinimalPurchaseValue = useCallback(async () => {
    try {
      setLoadingBag(true);
      const { data } = await api.get('checkout/minimal-purchase');

      setMinimalPurchaseValue(data.data);

      setLoadingBag(false);
    } catch (err) {
      setLoadingBag(false);
    }
  }, []);

  const handleNavigateToCheckout = useCallback(async () => {
    navigation.navigate(signed ? 'Checkout' : 'Auth');
  }, [navigation, signed]);

  useEffect(() => {
    retrieveMinimalPurchaseValue();
    calculateTotalPrice();

    dispatch(resetTrigger());
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [products, calculateTotalPrice]);

  useEffect(() => {
    setCanContinue(Number(totalBag) > Number(minimalPurchaseValue));
  }, [minimalPurchaseValue, totalBag, retrieveMinimalPurchaseValue]);

  function getPercentDiscountValue(product) {
    const { price, price_promotional } = product;

    return Math.ceil(((price - price_promotional) / price) * 100);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header title="Cesto de compras" close={handleGoBack} custom={true} />

      <Container>
        {products.length === 0 && (
          <EmptyBagContainer>
            <EmptyBagIcon width={200} height={200} />
            <EmptyBagTitle>Não há itens no cesto!</EmptyBagTitle>
            <EmptyBagText>
              Por favor, adicione item e volte no cesto de compras.
            </EmptyBagText>
          </EmptyBagContainer>
        )}

        {products.length !== 0 && (
          <>
            {loadingBag && (
              <ActivityIndicatorContainer>
                <ActivityIndicator size={50} color="#12b118" />
              </ActivityIndicatorContainer>
            )}

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
            </ProductsListContainer>

            {!canContinue && (
              <TotalLabel>
                Total: <TotalPrice>€ {Number(totalBag).toFixed(2)}</TotalPrice>
              </TotalLabel>
            )}

            <FinishButton
              canContinue={canContinue}
              onPress={() => {
                if (canContinue) handleNavigateToCheckout();
              }}
            >
              <FinishButtonText>
                {canContinue
                  ? `Finalizar compra | € ${Number(totalBag).toFixed(2)}`
                  : `De momento o valor mínimo para encomendas é de € ${minimalPurchaseValue}`}
              </FinishButtonText>
            </FinishButton>
          </>
        )}
      </Container>
    </>
  );
}
