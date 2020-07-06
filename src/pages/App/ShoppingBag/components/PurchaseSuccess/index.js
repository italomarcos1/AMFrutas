import React from 'react';
import { Modal, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Button from '~/components/Button';

import {
  PurchaseConfirmationModal,
  PurchaseConfirmationContainer,
} from './styles';

import PurchaseConfirmation from '~/assets/purchase-confirmation.svg';

import { viewOrder } from '~/store/modules/user/actions';

export default function PurchaseSuccess({ visible, closeModal }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Modal visible={visible} transparent onRequestClose={closeModal}>
      <PurchaseConfirmationModal>
        <PurchaseConfirmationContainer>
          <PurchaseConfirmation width={250} height={250} />
          <Text
            style={{
              color: '#333',
              fontSize: 26,
              marginTop: 15,
              fontWeight: 'bold',
            }}
          >
            Agradecemos a sua encomenda!
          </Text>
          <Text
            style={{
              color: '#3D9ACA',
              fontSize: 14,
              marginTop: 15,
            }}
          >
            A compra etc
          </Text>
          <Button
            style={{
              borderRadius: 30,
              height: 45,
              backgroundColor: '#12b118',
            }}
            onPress={() => {
              closeModal();
              dispatch(viewOrder());
              navigation.navigate('Account');
            }}
          >
            Visualizar a encomenda
          </Button>
        </PurchaseConfirmationContainer>
      </PurchaseConfirmationModal>
    </Modal>
  );
}

PurchaseSuccess.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
