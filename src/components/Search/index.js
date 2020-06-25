import React from 'react';
import { StatusBar, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import {
  ProductsList,
  Header,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  PurchaseConfirmationContainer,
  PurchaseConfirmationModal,
  SearchResults,
  SearchTotal,
  // Rate,
  // RateContainer,
} from './styles';

Icon.loadFont();

export default function Search({ open, closeModal, products, total, search }) {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12b118" />

      <Modal visible={open} transparent onRequestClose={closeModal}>
        <PurchaseConfirmationModal>
          <PurchaseConfirmationContainer>
            <Header>
              <SearchResults>{`Encontramos ${total} itens de `}</SearchResults>
              <SearchTotal>{`'${search}'`}</SearchTotal>
              <SearchResults>:</SearchResults>
            </Header>
            <ProductsList
              data={products}
              keyExtractor={product => String(product.id)}
              renderItem={({ item: product }) => (
                <ProductItem
                  onPress={() => {
                    closeModal();
                    navigation.navigate('Product', { item: product });
                  }}
                >
                  <ProductImage source={{ uri: product.thumbs }} />
                  <ProductInfo>
                    <ProductName numberOfLines={2}>{product.title}</ProductName>

                    <ProductPrice>{`€ ${product.price}`}</ProductPrice>
                  </ProductInfo>
                </ProductItem>
              )}
            />
          </PurchaseConfirmationContainer>
        </PurchaseConfirmationModal>
      </Modal>
    </>
  );
}

Search.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  products: PropTypes.oneOfType([PropTypes.array]).isRequired,
  total: PropTypes.number.isRequired,
};
