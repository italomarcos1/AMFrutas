import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomIcon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-tiny-toast';
import HTML from 'react-native-render-html';

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';

import PropTypes from 'prop-types';
import {
  AmountButton,
  AmountButtonContainer,
  Amount,
  BackButton,
  Header,
  PriceContainer,
  OldPrice,
  Price,
  SeeDescription,
  NoDescription,
  DescriptionContainer,
  ProductImage,
  ProductInfo,
  ProductPrice,
  ProductNameContainer,
  FavoriteContainer,
  ShippingContainer,
  Shipping,
  ShippingPrice,
  ShippingDestination,
  ChangeShippingDestination,
  Promotional,
  PromotionalPrice,
  PromotionalContainer,
  AddToCartContainer,
  WhatsAppButton,
  AddToCartButton,
  CreditContainer,
  MinimalPrice,
  WarrantyContainer,
  WarrantyOptionsContainer,
  ShieldContainer,
  TransparentBackground,
  SearchingContainer,
  DescriptionTitleContainer,
  Description,
  CloseDescription,
} from './styles';

import WhatsAppIcon from '~/assets/ico-menu-whatsapp.svg';
import Shield from '~/assets/ico-shield.svg';

import { addToCartRequest } from '~/store/modules/cart/actions';

import api from '~/services/api';

Icon.loadFont();
CustomIcon.loadFont();

export default function Product({ route, navigation }) {
  const product = route.params.item;

  console.tron.log(product);

  const favorites = useSelector(state => state.cart.favorites);
  const products = useSelector(state => state.cart.products);

  const [shippingCost, setShippingCost] = useState('');
  const [description, setDescriptionOpen] = useState(false);
  const [productDescription, setProductDescription] = useState('');

  useEffect(() => {
    async function loadProductImages() {
      const [cost, prod] = await Promise.all([
        api.get(`checkout/shipping-cost`),
        api.get(`ecommerce/products/${product.id}`),
      ]);

      const {
        data: { data },
      } = prod;

      setShippingCost(cost.data.data);
      setProductDescription(data.description_general);
    }
    loadProductImages();
  }, []);

  const [amount, setAmount] = useState(() => {
    const index = products.findIndex(prod => prod.id === product.id);
    if (index >= 0) {
      return products[index].product.amount;
    }
    return 1;
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
                <PromotionalContainer>
                  {product.price_promotional !== '0.00' && (
                    <Promotional>
                      <Icon name="local-offer" size={14} color="#F7D100" />
                      <PromotionalPrice>{`-${handlePromotionalPercentage()}%`}</PromotionalPrice>
                    </Promotional>
                  )}
                </PromotionalContainer>
                <FavoriteContainer>
                  {isFavorite ? (
                    <Icon name="favorite" color="#f6b32a" size={30} />
                  ) : (
                    <Icon name="favorite-border" color="#f6b32a" size={30} />
                  )}
                </FavoriteContainer>
              </ProductPrice>

              <ProductNameContainer>
                <Text style={{ fontSize: 20, marginVertical: 10 }}>
                  {product.title}
                </Text>
              </ProductNameContainer>
              <DescriptionContainer>
                {productDescription === '' ? (
                  <NoDescription />
                ) : (
                  <SeeDescription onPress={() => setDescriptionOpen(true)}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                      Ver Descrição
                    </Text>
                  </SeeDescription>
                )}
                <AmountButtonContainer>
                  <AmountButton
                    disabled={amount === 0}
                    onPress={() => setAmount(amount - 1)}
                  >
                    <Icon name="remove" size={25} color="black" />
                  </AmountButton>
                  <Amount>{amount}</Amount>
                  <AmountButton onPress={() => setAmount(amount + 1)}>
                    <Icon name="add" size={25} color="black" />
                  </AmountButton>
                </AmountButtonContainer>
              </DescriptionContainer>
            </ProductInfo>
            <MinimalPrice>
              <Text style={{ color: '#fff' }}>
                COMPRA MÍNIMA PARA ENVIO É DE € 30,00
              </Text>
            </MinimalPrice>
            <CreditContainer
              style={{
                height: 150,
              }}
            >
              <ShippingContainer>
                <Shipping>Porte:</Shipping>
                <ShippingPrice>{`€ ${shippingCost}`}</ShippingPrice>
              </ShippingContainer>
              <Text style={{ fontSize: 14, color: '#F48312' }}>
                Porte gratuito para compras acima de € 50,00
              </Text>
              <ShippingContainer>
                <Text style={{ color: '#9A9A9A', fontSize: 14 }}>Para</Text>
                <ShippingDestination>Lisboa</ShippingDestination>
                <Text style={{ color: '#9A9A9A', fontSize: 14 }}>
                  via AM Frutas
                </Text>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{ marginHorizontal: 5 }}
                >
                  <ChangeShippingDestination>Alterar</ChangeShippingDestination>
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
              <WarrantyOptionsContainer>
                <CustomIcon name="chevron-right" color="#000" size={25} />
              </WarrantyOptionsContainer>
            </WarrantyContainer>
          </View>
        </ScrollView>
        <AddToCartContainer>
          <WhatsAppButton onPress={sendWhatsappMessage}>
            <WhatsAppIcon height={25} width={25} style={{ marginBottom: 5 }} />
            <Text style={{ textAlign: 'center', fontSize: 12 }}>
              Contato Via WhatsApp
            </Text>
          </WhatsAppButton>
          <AddToCartButton
            disabled={amount === 0}
            onPress={() => {
              handleAddToCart();
              Toast.showSuccess('Produto adicionado ao carrinho');
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Adicionar ao Cesto
            </Text>
          </AddToCartButton>
        </AddToCartContainer>
        <Modal
          visible={description}
          onRequestClose={() => setDescriptionOpen(false)}
          transparent
        >
          <TransparentBackground>
            <SearchingContainer>
              <DescriptionTitleContainer>
                <Description>Detalhes do Produto</Description>
                <CloseDescription onPress={() => setDescriptionOpen(false)}>
                  <CustomIcon name="x" size={20} color="#fff" />
                </CloseDescription>
              </DescriptionTitleContainer>
              <HTML
                html={productDescription}
                tagsStyles={{
                  p: {
                    fontSize: 21,
                    lineHeight: 25,
                    marginBottom: 5,
                  },
                }}
              />
            </SearchingContainer>
          </TransparentBackground>
        </Modal>
      </View>
    </>
  );
}

Product.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.string,
        price_promotional: PropTypes.string,
        banner: PropTypes.string,
        thumbs: PropTypes.string,
        description_general: PropTypes.string,
      }),
    }),
  }).isRequired,
};
