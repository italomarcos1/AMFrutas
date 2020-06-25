import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-tiny-toast';

import api from '~/services/api';

import AddIcon from '~/assets/ico-add-address.svg';
import EditAddressIcon from '~/assets/ico-edit-address.svg';
import RemoveAddressIcon from '~/assets/ico-remove-address.svg';

import {
  Container,
  Address,
  AddressInfo,
  AddressInfoField,
  AddNewAddressButton,
  SideContainer,
  LoadingContainer,
  NoAddressesText,
  NoAddressesContainer,
} from './styles';

import { RadioButtonBackground, Selected } from '../Gender/styles';
import Header from '~/components/HeaderMenu';

import { updateProfileSuccess } from '~/store/modules/user/actions';

export default function Shipping({ navigation }) {
  const user = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState('Casa');
  const [selectedAddressId, setSelectedAddressId] = useState(
    user.default_address.id
  );

  const [loading, setLoading] = useState(false);
  const [noAddresses, setNoAddresses] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const handleDeleteAddress = useCallback(
    async id => {
      await api.delete(`clients/addresses/${id}`);
      if (addresses.length === 1) {
        setAddresses([]);
      } else {
        const filtered = addresses.filter(address => address.id !== id);
        setAddresses(filtered);
      }
    },
    [addresses]
  );

  const setDefaultAddress = useCallback(async () => {
    if (
      selectedAddressId === -5 ||
      selectedAddressId === user.default_address.id
    )
      return;
    try {
      const {
        data: { data },
      } = await api.put(`/clients/addresses/${selectedAddressId}`);

      dispatch(updateProfileSuccess({ ...user, default_address: data }));

      Toast.showSuccess('Endereço atualizado com sucesso.');
    } catch (err) {
      Toast.show('Erro no update de endereço.');
    }
  }, [selectedAddressId, user.default_address.id]);

  useEffect(() => {
    async function loadAdresses() {
      try {
        setLoading(true);
        const { data } = await api.get('clients/addresses');
        if (data.meta.message !== 'Você ainda não tem endereços cadastrados.') {
          setAddresses(data.data);
          setNoAddresses(false);
        } else {
          setNoAddresses(true);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    loadAdresses();
  }, []);

  useEffect(() => {
    setDefaultAddress();
  }, [selectedAddressId]);

  return (
    <>
      <Header
        custom
        title="Endereço de entrega"
        close={() => navigation.goBack()}
      />
      <Container
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        {loading && (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#333" />
          </LoadingContainer>
        )}
        {!loading &&
          !noAddresses &&
          addresses.map(address => (
            <Address
              key={String(address.id)}
              onPress={() => {
                setSelectedAddress(address.name);
                setSelectedAddressId(address.id);
              }}
            >
              <SideContainer>
                <RadioButtonBackground>
                  <Selected selected={selectedAddress === address.name} />
                </RadioButtonBackground>
              </SideContainer>

              <AddressInfo>
                <Text style={{ fontWeight: 'bold' }}>{address.name}</Text>
                <AddressInfoField>{`${address.address} ${address.number}`}</AddressInfoField>
                <AddressInfoField>
                  {`${address.zipcode} ${address.city} - ${address.state}`}
                </AddressInfoField>
                <AddressInfoField>{address.complement}</AddressInfoField>
                <AddressInfoField>{user.cellphone}</AddressInfoField>
              </AddressInfo>

              <SideContainer>
                <TouchableOpacity
                  onPress={() => handleDeleteAddress(address.id)}
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                  <RemoveAddressIcon
                    height={20}
                    width={25}
                    style={{ marginBottom: 30 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditAddress', { address })
                  }
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                  <EditAddressIcon height={20} width={25} />
                </TouchableOpacity>
              </SideContainer>
            </Address>
          ))}
        {!loading && noAddresses && (
          <NoAddressesContainer>
            <NoAddressesText>
              Você ainda não tem endereços cadastrados.
            </NoAddressesText>
          </NoAddressesContainer>
        )}
        <AddNewAddressButton
          onPress={() => navigation.navigate('AddNewAddress')}
        >
          {addresses !== [] ? (
            <AddIcon height={60} width={60} />
          ) : (
            <Text>
              Você ainda não tem endereços adicionados. Clique aqui para
              adicionar.
            </Text>
          )}
        </AddNewAddressButton>
      </Container>
    </>
  );
}

Shipping.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
