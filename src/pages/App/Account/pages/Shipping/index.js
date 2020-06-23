import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
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
} from './styles';

import { RadioButtonBackground, Selected } from '../Gender/styles';
import Header from '~/components/HeaderMenu';

export default function Shipping({ navigation }) {
  const user = useSelector(state => state.user.profile);

  // baseado nisso, puxa a string e marca o campo
  // ao selecionar outro, dá o update na rota de update dados do usuário
  // dá update no reducer também

  const [selectedAddress, setSelectedAddress] = useState('Casa');
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    if (user.default_address !== []) return user.default_address.id;
    return 0;
  });

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
    if (selectedAddressId === user.default_address.id) return;
    if (selectedAddressId === 0) return;
    try {
      await api.put(`/clients/addresses/${selectedAddressId}`);
      Toast.showSuccess('Endereço atualizado com sucesso.');
    } catch (err) {
      Toast.show('Erro no update de endereço.');
    }
  }, [selectedAddressId, user.default_address.id]); // componentWillUnmount

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
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#333" />
          </View>
        )}
        {!loading &&
          !noAddresses &&
          addresses.map(address => (
            <Address
              key={String(address.id)}
              onPress={() => {
                setSelectedAddress(address.name);
                setSelectedAddressId(address.id);
                setDefaultAddress();
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
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#333',
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >
              Você ainda não tem endereços cadastrados.
            </Text>
          </View>
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
