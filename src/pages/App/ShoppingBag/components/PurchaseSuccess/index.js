import React from 'react';
import { Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import {
  PurchaseConfirmationModal,
  PurchaseConfirmationContainer,
  Title,
  Subtitle,
  ViewOrder,
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
          <Title>Agradecemos a sua encomenda!</Title>
          <Subtitle>
            A confirmação da sua encomenda será feita através de contacto
            telefónico pelos nossos colaboradores no dia da entrega.{' '}
          </Subtitle>
          <ViewOrder
            onPress={() => {
              dispatch(viewOrder());
              navigation.navigate('Account');
              closeModal();
            }}
          >
            Visualizar a encomenda
          </ViewOrder>
        </PurchaseConfirmationContainer>
      </PurchaseConfirmationModal>
    </Modal>
  );
}

PurchaseSuccess.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
