import React, { useCallback, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import Toast from 'react-native-tiny-toast';

import Validation from '~/components/Validation';
import ButtonMenu from '~/components/ButtonMenu';
import InputMenu from '~/components/InputMenu';
import Header from '~/components/HeaderMenu';

import api from '~/services/api';

import { Container, InputContainer, InputName, CustomView } from './styles';

export default function EditAddress({ navigation, route }) {
  const addressInfo = route.params.address;
  const { id } = route.params.address;

  const [name, setName] = useState(addressInfo.name);
  const [zipcode, setZipcode] = useState(addressInfo.zipcode);
  const [address, setAddress] = useState(addressInfo.address);
  const [number, setNumber] = useState(addressInfo.number);
  const [city, setCity] = useState(addressInfo.city);
  const [state, setState] = useState(addressInfo.state);
  const [district, setDistrict] = useState(addressInfo.district);
  const [complement, setComplement] = useState(addressInfo.complement);

  const zipcodeRef = useRef();
  const addressRef = useRef();
  const numberRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const districtRef = useRef();
  const complementRef = useRef();

  const [loading, setLoading] = useState(false);

  const handleEditAddress = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.put(`addresses/${id}`, {
        name,
        zipcode,
        address,
        number,
        city,
        state,
        district,
        complement,
      });

      setLoading(false);

      Toast.show(`${data.meta.message}`);
      navigation.goBack();
    } catch (err) {
      setLoading(false);

      Toast.show('Houve um erro ao alterar o endereço.');
    }
  }, [
    id,
    name,
    zipcode,
    address,
    number,
    city,
    state,
    district,
    complement,
    navigation,
  ]);

  return (
    <>
      <Header title="Editar endereço" close={() => navigation.goBack()} />

      <Validation title="Altere os dados do seu endereço" />

      <Container
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 30,
        }}
      >
        <InputContainer>
          <InputName>Nome (Casa, Trabalho...)</InputName>
          <InputMenu
            autoFocus
            selected={!!name}
            autoCorrect={false}
            maxLength={20}
            clear={() => setName('')}
            value={name}
            onChangeText={setName}
            returnKeyType="next"
            onSubmitEditing={() => zipcodeRef.current.focus()}
          />
        </InputContainer>

        <CustomView>
          <InputContainer style={{ flex: 1, marginRight: 20 }}>
            <InputName>Código Postal</InputName>
            <InputMenu
              style={{ flex: 1, maxWidth: 300, maxHeight: 45 }}
              maxLength={9}
              selected={!!zipcode}
              autoCorrect={false}
              placeholder="95880-000"
              clear={() => setZipcode('')}
              ref={zipcodeRef}
              value={zipcode}
              onChangeText={setZipcode}
              returnKeyType="next"
              onSubmitEditing={() => numberRef.current.focus()}
            />
          </InputContainer>

          <InputContainer style={{ flex: 1, marginLeft: 20 }}>
            <InputName>Número</InputName>
            <InputMenu
              maxLength={4}
              selected={!!number}
              autoCorrect={false}
              keyboardType="numeric"
              clear={() => setNumber('')}
              ref={numberRef}
              value={number}
              onChangeText={setNumber}
              returnKeyType="next"
              onSubmitEditing={() => addressRef.current.focus()}
            />
          </InputContainer>
        </CustomView>

        <InputContainer style={{ marginBottom: 0 }}>
          <InputName>Morada</InputName>
          <InputMenu
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={45}
            selected={!!address}
            clear={() => setAddress('')}
            ref={addressRef}
            value={address}
            onChangeText={setAddress}
            returnKeyType="next"
            onSubmitEditing={() => complementRef.current.focus()}
          />
        </InputContainer>

        <InputContainer style={{ marginTop: 0 }}>
          <InputName>Complemento</InputName>
          <InputMenu
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={45}
            selected={!!complement}
            clear={() => setComplement('')}
            ref={complementRef}
            value={complement}
            onChangeText={setComplement}
            returnKeyType="next"
            onSubmitEditing={() => districtRef.current.focus()}
          />
        </InputContainer>

        <InputContainer style={{ marginTop: 0 }}>
          <InputName>Distrito</InputName>
          <InputMenu
            autoCorrect={false}
            maxLength={45}
            selected={!!district}
            clear={() => setDistrict('')}
            ref={districtRef}
            value={district}
            onChangeText={setDistrict}
            returnKeyType="next"
            onSubmitEditing={() => cityRef.current.focus()}
          />
        </InputContainer>

        <InputContainer style={{ flex: 1 }}>
          <InputName>Cidade</InputName>
          <InputMenu
            style={{ flex: 1, maxHeight: 45 }}
            maxLength={35}
            selected={!!city}
            autoCapitalize="characters"
            clear={() => setCity('')}
            autoCorrect={false}
            ref={cityRef}
            value={city}
            onChangeText={setCity}
            returnKeyType="next"
            onSubmitEditing={() => stateRef.current.focus()}
          />
        </InputContainer>

        <InputContainer style={{ flex: 1 }}>
          <InputName>Localidade</InputName>
          <InputMenu
            maxLength={45}
            selected={!!state}
            autoCorrect={false}
            autoCapitalize="characters"
            placeholder="Localidade"
            clear={() => setState('')}
            ref={stateRef}
            value={state}
            onChangeText={setState}
            returnKeyType="send"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </InputContainer>

        <ButtonMenu
          loading={loading}
          disabled={
            !name ||
            !zipcode ||
            !address ||
            !number ||
            !city ||
            !state ||
            !district ||
            !complement
          }
          onPress={handleEditAddress}
          style={{ marginTop: 60 }}
        >
          Salvar alterações
        </ButtonMenu>
      </Container>
    </>
  );
}

EditAddress.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      address: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        zipcode: PropTypes.string,
        address: PropTypes.string,
        number: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        district: PropTypes.string,
        complement: PropTypes.string,
      }),
    }),
  }).isRequired,
};
