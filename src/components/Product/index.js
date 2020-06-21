import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomIcon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-tiny-toast';
import {
  FlatList,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

import PropTypes from 'prop-types';
import {
  AmountButton,
  AmountButtonContainer,
  BackButton,
  Header,
  PriceContainer,
  OldPrice,
  Price,
  SeeDescription,
  ProductImage,
  ProductInfo,
  ProductPrice,
  ProductNameContainer,
  ShippingContainer,
  Shipping,
  ShippingPrice,
  Promotional,
  PromotionalPrice,
  Ticket,
  TicketText,
  TicketCut,
  AddToCartContainer,
  WhatsAppButton,
  AddToCartButton,
  CreditContainer,
  CouponContainer,
  MinimalPrice,
  WarrantyContainer,
  ShieldContainer,
  Rate,
  ReviewImage,
  ReviewImageContainer,
  MoreImages,
} from './styles';

import WhatsAppIcon from '~/assets/ico-menu-whatsapp.svg';
import Shield from '~/assets/ico-shield.svg';

import { addToCartRequest, updateAmount } from '~/store/modules/cart/actions';

import api from '~/services/api';

Icon.loadFont(); // criar um svg
CustomIcon.loadFont(); // criar um svg

export default function Product({ route, navigation }) {
  const product = route.params.item;

  const favorites = useSelector(state => state.cart.favorites);
  const products = useSelector(state => state.cart.products);

  const [stock, setStock] = useState(0);
  const [amount, setAmount] = useState(() => {
    const index = products.findIndex(prod => prod.id === product.id);
    if (index >= 0) {
      return products[index].product.amount;
    }
    return 0;
  });

  const dispatch = useDispatch();

  const sendWhatsappMessage = useCallback(() => {
    Linking.canOpenURL('whatsapp://send?phone=5561995807642').then(found => {
      if (found) {
        return Linking.openURL('whatsapp://send?phone=5561995807642');
      }

      return Linking.openURL(
        'https://api.whatsapp.com/send?phone=5561995807642'
      );
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(product, amount));
  }, [dispatch, product, amount]);

  const handlePromotionalPercentage = useCallback(() => {
    const { price, price_promotional } = product;
    const promotional = Math.ceil(((price - price_promotional) / price) * 100);

    return promotional;
  }, [product]);

  const isFavorite = !!favorites.find(fav => fav.id === product.id);

  const uri =
    'https://images.squarespace-cdn.com/content/v1/53864e11e4b0e13cfb6c46c5/1570553423992-SVJWHEWJUJT8QMCJRSL7/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfNdxJhjhuaNor070w_QAc94zjGLGXCa1tSmDVMXf8RUVhMJRmnnhuU1v2M8fLFyJw/Jute+Filled.jpg';

  return (
    <>
      <Header>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="chevron-left" size={30} />
        </BackButton>

        <BackButton onPress={() => {}} style={{ marginLeft: 20 }}>
          <Icon name="more-horiz" size={30} />
        </BackButton>
      </Header>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={{ height: 1050 }}>
          <View style={{ flex: 1 }}>
            <ProductImage source={{ uri: product.banner }} resizeMode="cover" />
            <ProductInfo>
              <ProductPrice>
                <PriceContainer>
                  <OldPrice>{`€ ${product.price}`}</OldPrice>
                  <Text>por</Text>
                  <Price style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {`€ ${product.price}`}
                  </Price>
                </PriceContainer>
                <View
                  style={{
                    flex: 0.6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {product.price_promotional !== '0.00' && (
                    <Promotional>
                      <Icon name="local-offer" size={14} color="#F7D100" />
                      <PromotionalPrice>{`-${handlePromotionalPercentage()}%`}</PromotionalPrice>
                    </Promotional>
                  )}
                </View>
                <View
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {isFavorite ? (
                    <Icon name="favorite" color="#f6b32a" size={30} />
                  ) : (
                    <Icon name="favorite-border" color="#f6b32a" size={30} />
                  )}
                </View>
              </ProductPrice>

              <ProductNameContainer>
                <Text style={{ fontSize: 20, marginVertical: 10 }}>
                  {product.title}
                </Text>
              </ProductNameContainer>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}
              >
                <SeeDescription onPress={() => {}}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                    Ver Descrição
                  </Text>
                </SeeDescription>
                <AmountButtonContainer>
                  <AmountButton
                    disabled={amount === 0}
                    onPress={() => setAmount(amount - 1)}
                  >
                    <Icon name="remove" size={25} color="black" />
                  </AmountButton>
                  <Text
                    style={{
                      fontSize: 28,
                      alignSelf: 'center',
                      textAlign: 'center',
                    }}
                  >
                    {amount}
                  </Text>
                  <AmountButton onPress={() => setAmount(amount + 1)}>
                    <Icon name="add" size={25} color="black" />
                  </AmountButton>
                </AmountButtonContainer>
              </View>
            </ProductInfo>
            <CreditContainer>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Crédito</Text>
              <Text style={{ fontSize: 14 }}>
                Nesta compra você recebe $0.19 de crédito.
              </Text>
            </CreditContainer>
            <CouponContainer>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Cupom</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 20,
                }}
              >
                <TicketCut />
                <Ticket>
                  <TicketText>5% de desconto com o cupom TGOO</TicketText>
                </Ticket>
                <TicketCut />
              </View>
              <SeeDescription onPress={() => {}}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  Usar Cupom
                </Text>
              </SeeDescription>
            </CouponContainer>
            <MinimalPrice>
              <Text style={{ color: '#fff' }}>AAAAAAAAAAAAAA</Text>
            </MinimalPrice>
            <CreditContainer
              style={{
                height: 150,
              }}
            >
              <ShippingContainer>
                <Shipping>Porte:</Shipping>
                <ShippingPrice>€ 4,00</ShippingPrice>
              </ShippingContainer>
              <Text style={{ fontSize: 14, color: '#F48312' }}>
                Porte gratuito para compras acima de € 50,00
              </Text>
              <ShippingContainer>
                <Text style={{ color: '#9A9A9A', fontSize: 14 }}>Para</Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginHorizontal: 3,
                  }}
                >
                  Lisboa
                </Text>
                <Text style={{ color: '#9A9A9A', fontSize: 14 }}>
                  via AM Frutas
                </Text>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{ marginHorizontal: 5 }}
                >
                  <Text
                    style={{
                      color: '#FF0202',
                      textDecorationLine: 'underline',
                    }}
                  >
                    Alterar
                  </Text>
                </TouchableOpacity>
              </ShippingContainer>
              <ShippingContainer>
                <Text style={{ fontSize: 15 }}>Tempo de entrega:</Text>
                <Text style={{ fontSize: 15, color: '#259D41', marginLeft: 3 }}>
                  3 dias
                </Text>
              </ShippingContainer>
            </CreditContainer>
            <WarrantyContainer>
              <ShieldContainer>
                <Shield />
                <Text style={{ marginLeft: 10 }}>
                  Garantia de produtos frescos
                </Text>
              </ShieldContainer>
              <View
                style={{
                  flex: 0.3,
                  alignItems: 'flex-end',
                  paddingRight: 20,
                }}
              >
                <CustomIcon name="chevron-right" color="#000" size={25} />
              </View>
            </WarrantyContainer>
            {/* <CouponContainer>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}
                >
                  Opinião dos consumidores
                </Text>
                <View
                  style={{
                    alignItems: 'flex-end',
                  }}
                >
                  <CustomIcon name="chevron-right" color="#000" size={25} />
                </View>
              </View>

              <Rate>
                <Icon name="star" size={14} color="red" />
                {`${product.rate} | ${product.comments} comentários`}
              </Rate>

              <ReviewImageContainer>
                <ReviewImage
                  source={{
                    uri,
                  }}
                />
                <ReviewImage
                  source={{
                    uri,
                  }}
                />
                <ReviewImage
                  source={{
                    uri,
                  }}
                />
                <ReviewImage
                  source={{
                    uri,
                  }}
                />
                <ReviewImage
                  source={{
                    uri,
                  }}
                />
                <MoreImages>
                  <Icon name="more-horiz" size={30} />
                </MoreImages>
              </ReviewImageContainer>
            </CouponContainer> */}
          </View>
        </ScrollView>
        <AddToCartContainer>
          <WhatsAppButton onPress={sendWhatsappMessage}>
            {/* <Icon name="phone" size={25} color="#000" /> */}
            <WhatsAppIcon height={25} width={25} style={{ marginBottom: 5 }} />
            <Text style={{ textAlign: 'center', fontSize: 12 }}>
              Contato Via WhatsApp
            </Text>
          </WhatsAppButton>
          <AddToCartButton
            disabled={amount === 0}
            onPress={() => {
              handleAddToCart();
              navigation.navigate('ShoppingBag');
              Toast.showSuccess('Produto adicionado ao carrinho');
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Adicionar ao Cesto
            </Text>
          </AddToCartButton>
        </AddToCartContainer>
      </View>
    </>
  );
}
