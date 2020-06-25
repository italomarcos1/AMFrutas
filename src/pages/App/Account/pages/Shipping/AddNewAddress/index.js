import React, { useCallback, useRef, useState } from 'react';
import { Text, Keyboard } from 'react-native';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';

import Validation from '~/components/Validation';
import ButtonMenu from '~/components/ButtonMenu';
import InputMenu from '~/components/InputMenu';
import Header from '~/components/HeaderMenu';

import api from '~/services/api';

import { Container, InputContainer, InputName, CustomView } from './styles';

export default function AddNewAddress({ navigation }) {
  const [name, setName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');

  const zipcodeRef = useRef();
  const addressRef = useRef();
  const numberRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const districtRef = useRef();
  const complementRef = useRef();

  const [loading, setLoading] = useState(false);

  const handleAddAddress = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.post('clients/addresses', {
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

      Toast.showSuccess(`${data.meta.message}`);
      navigation.goBack();
    } catch (err) {
      setLoading(false);

      Toast.show('Houve um erro ao cadastrar o endereço.');
    }
  }, [
    name,
    number,
    address,
    city,
    state,
    district,
    complement,
    zipcode,
    navigation,
  ]);

  return (
    <>
      <Header title="Adicionar endereço" close={() => navigation.goBack()} />
      <Validation title="Digite o seu endereço" />

      <Container
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 30,
        }}
      >
        <InputContainer>
          <Text style={{ fontSize: 12, color: '#76797E', marginBottom: 5 }}>
            Nome (Casa, Trabalho...)
          </Text>
          <InputMenu
            autoFocus
            selected={!!name}
            autoCorrect={false}
            maxLength={25}
            clear={() => setName('')}
            value={name}
            onChangeText={value => setName(value)}
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
              maxLength={5}
              selected={!!number}
              autoCorrect={false}
              keyboardType="numeric"
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

        <CustomView>
          <InputContainer style={{ flex: 1, marginRight: 20 }}>
            <InputName>Cidade</InputName>
            <InputMenu
              style={{ flex: 1, maxWidth: 300, maxHeight: 45 }}
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

          <InputContainer style={{ flex: 1, marginLeft: 20 }}>
            <InputName>Localidade</InputName>
            <InputMenu
              maxLength={45}
              selected={!!state}
              autoCorrect={false}
              autoCapitalize="characters"
              placeholder="GO, SP, RN..."
              clear={() => setState('')}
              ref={stateRef}
              value={state}
              onChangeText={setState}
              returnKeyType="send"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </InputContainer>
        </CustomView>

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
          onPress={handleAddAddress}
          style={{ marginTop: 60 }}
        >
          Adicionar Endereço
        </ButtonMenu>
      </Container>
    </>
  );
}

AddNewAddress.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
