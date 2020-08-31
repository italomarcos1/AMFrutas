import React, { useCallback, useRef, useState } from 'react';
import {
  Keyboard,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';

import { useNavigation } from '@react-navigation/native';
import Validation from '~/components/Validation';
import ButtonMenu from '~/components/ButtonMenu';
import InputMenu from '~/components/InputMenu';
import Header from '~/components/HeaderMenu';

import api from '~/services/api';

import { updateProfileSuccess } from '~/store/modules/user/actions';

import { Container, InputContainer, InputName, CustomView } from './styles';

export default function AddNewAddress({ closeModal, asModal }) {
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

  const user = useSelector(reduxState => reduxState.user.profile);

  const dispatch = useDispatch();
  const navigation = useNavigation();

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

      await api.put(`/clients/addresses/${data.data.id}`);

      const updatedUser = { ...user, default_address: data.data };
      dispatch(updateProfileSuccess(updatedUser));

      Toast.showSuccess(`${data.meta.message}`);
      if (asModal) {
        closeModal();
      } else {
        navigation.goBack();
      }
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
    dispatch,
    user,
    asModal,
    closeModal,
  ]);

  return (
    <>
      <StatusBar backgroundColor="#5bae59" barStyle="light-content" />

      <Header
        title="Endereço de entrega"
        close={() => (asModal ? closeModal() : navigation.goBack())}
      />
      <Validation title="Digite o seu endereço" />

      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        keyboardVerticalOffset={0}
      >
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
              maxLength={25}
              clear={() => setName('')}
              value={name}
              onChangeText={value => setName(value)}
              returnKeyType="next"
              onSubmitEditing={() => zipcodeRef.current.focus()}
            />
          </InputContainer>

          <CustomView>
            <InputContainer style={{ flex: 1, marginRight: 10 }}>
              <InputName>Código Postal</InputName>
              <InputMenu
                maxLength={9}
                selected={!!zipcode}
                autoCorrect={false}
                keyboardType="phone-pad"
                clear={() => setZipcode('')}
                ref={zipcodeRef}
                value={zipcode}
                onChangeText={setZipcode}
                returnKeyType="next"
                onSubmitEditing={() => numberRef.current.focus()}
              />
            </InputContainer>

            <InputContainer style={{ flex: 1, marginLeft: 10 }}>
              <InputName>Número</InputName>
              <InputMenu
                maxLength={5}
                selected={!!number}
                autoCorrect={false}
                keyboardType="phone-pad"
                clear={() => setNumber('')}
                ref={numberRef}
                value={number}
                onChangeText={setNumber}
                returnKeyType="next"
                onSubmitEditing={() => addressRef.current.focus()}
              />
            </InputContainer>
          </CustomView>

          <InputContainer>
            <InputName>Morada</InputName>
            <InputMenu
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

          <InputContainer>
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

          <InputContainer>
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
            <InputContainer style={{ flex: 1, marginRight: 10 }}>
              <InputName>Cidade</InputName>
              <InputMenu
                maxLength={35}
                selected={!!city}
                clear={() => setCity('')}
                autoCorrect={false}
                ref={cityRef}
                value={city}
                onChangeText={setCity}
                returnKeyType="next"
                onSubmitEditing={() => stateRef.current.focus()}
              />
            </InputContainer>

            <InputContainer style={{ flex: 1, marginLeft: 10 }}>
              <InputName>Localidade</InputName>
              <InputMenu
                maxLength={45}
                selected={!!state}
                autoCorrect={false}
                placeholder="Localidade"
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
            disabled={!zipcode || !address || !city || !state || !district}
            onPress={handleAddAddress}
            style={{ marginTop: 40 }}
          >
            Adicionar Endereço
          </ButtonMenu>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
}

AddNewAddress.propTypes = {
  closeModal: PropTypes.func,
  asModal: PropTypes.bool,
};

AddNewAddress.defaultProps = {
  closeModal: () => {},
  asModal: false,
};
