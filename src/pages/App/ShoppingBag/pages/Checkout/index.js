import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  Picker,
} from 'react-native';
import Toast from 'react-native-tiny-toast';

import Header from '~/components/HeaderMenu';
import InputMenu from '~/components/InputMenu';

import { updateProfileSuccess } from '~/store/modules/user/actions';

import api from '~/services/api';

import {
  StepsContainer,
  Step,
  StepText,
  Container,
  AlertMessage,
  InputContainer,
  ProceedButton,
  ProceedButtonText,
} from './styles';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.user.profile);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [alertMessageVisible, setAlertMessageVisible] = useState(false);

  const [name, setName] = useState(user.name);
  const [last_name, setLastName] = useState(user.last_name);
  const [document, setDocument] = useState(user.document);
  const [cellphone, setCellphone] = useState(user.cellphone);

  const lastNameRef = useRef();
  const documentRef = useRef();
  const cellphoneRef = useRef();

  const GoToShippingStep = useCallback(async () => {
    if (
      !name.length ||
      !last_name.length ||
      !document.length ||
      !cellphone.length
    ) {
      setAlertMessageVisible(true);
    } else if (
      name !== user.name ||
      last_name !== user.last_name ||
      document !== user.document ||
      cellphone !== user.cellphone
    ) {
      try {
        setAlertMessageVisible(false);
        setLoading(true);

        await api.put('clients', { name, last_name, document, cellphone });
        const updatedUser = { ...user, name, last_name, document, cellphone };

        dispatch(updateProfileSuccess(updatedUser));

        setLoading(false);
        setCurrentStep(2);
      } catch (err) {
        setLoading(false);
        Toast.show('Ocorreu um erro ao processar os dados.');
      }
    } else {
      setAlertMessageVisible(false);
      setCurrentStep(2);
    }
  }, [user, cellphone, dispatch, document, last_name, name]);

  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [zipcode, setZipcode] = useState(null);
  const [address, setAddress] = useState(null);
  const [number, setNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);

  const addressRef = useRef();
  const numberRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const districtRef = useRef();

  const GoToPaymentStep = useCallback(async () => {
    if (
      zipcode === null ||
      address === null ||
      number === null ||
      city === null ||
      district === null
    ) {
      setAlertMessageVisible(true);
    } else if (selectedAddress === null) {
      try {
        setAlertMessageVisible(false);
        setLoading(true);

        const { data } = await api.post('clients/addresses', {
          zipcode,
          address,
          number,
          city,
          state,
          district,
        });

        await api.put(`/clients/addresses/${data.data.id}`);

        const updatedUser = { ...user, default_address: data.data };
        dispatch(updateProfileSuccess(updatedUser));

        setLoading(false);
        setSelectedAddress(data);
        setCurrentStep(3);
      } catch (err) {
        setLoading(false);
        Toast.show('Ocorreu um erro ao processar os dados.');
      }
    } else if (
      selectedAddress !== null &&
      (address !== selectedAddress.address ||
        number !== selectedAddress.number ||
        city !== selectedAddress.city ||
        state !== selectedAddress.state ||
        district !== selectedAddress.district)
    ) {
      try {
        setAlertMessageVisible(false);
        setLoading(true);

        const { data } = await api.put(
          `clients/addresses/${selectedAddress.id}`,
          {
            zipcode,
            address,
            number,
            city,
            state,
            district,
          }
        );

        dispatch(updateProfileSuccess({ ...user, default_address: data.data }));

        setLoading(false);
        setSelectedAddress(data);
        setCurrentStep(3);
      } catch (err) {
        setLoading(false);
        Toast.show('Ocorreu um erro ao processar os dados.');
      }
    } else {
      setAlertMessageVisible(false);
      setCurrentStep(2);
    }
  }, [
    address,
    city,
    dispatch,
    number,
    state,
    district,
    zipcode,
    selectedAddress,
    user,
  ]);

  const loadAdresses = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('clients/addresses');

      if (data.meta.message !== 'Você ainda não tem endereços cadastrados.') {
        setAddresses(data.data);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  });

  const loadShippingMethods = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('checkout/shipping-methods');

      setShippingMethods(data.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentStep === 2) {
      loadAdresses();
      loadShippingMethods();
    }
  }, [currentStep]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header
        title="Confirmar encomenda"
        close={() => navigation.goBack()}
        custom={true}
      />

      <StepsContainer>
        <Step
          validated={currentStep > 1}
          selected={currentStep === 1}
          disabled={currentStep < 1}
          onPress={() => {
            if (currentStep > 1) setCurrentStep(1);
          }}
        >
          <StepText>Meus dados</StepText>
        </Step>

        <Step
          validated={currentStep > 2}
          selected={currentStep === 2}
          disabled={currentStep < 2}
          onPress={() => {
            if (currentStep > 2) setCurrentStep(2);
          }}
        >
          <StepText>Entrega</StepText>
        </Step>

        <Step
          validated={currentStep > 3}
          selected={currentStep === 3}
          disabled={currentStep < 3}
        >
          <StepText>Pagamento</StepText>
        </Step>
      </StepsContainer>

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
        <Container>
          <AlertMessage visible={alertMessageVisible}>
            Preencha todos os campos para continuar!
          </AlertMessage>

          {currentStep === 1 && (
            <>
              <InputContainer>
                <InputMenu
                  label="Nome"
                  autoCapitalize="words"
                  autoCorrect={false}
                  maxLength={25}
                  clear={() => setName('')}
                  value={name}
                  onChangeText={value => setName(value)}
                  returnKeyType="next"
                  onSubmitEditing={() => lastNameRef.current.focus()}
                />
              </InputContainer>

              <InputContainer>
                <InputMenu
                  label="Sobrenome"
                  autoCapitalize="words"
                  autoCorrect={false}
                  maxLength={45}
                  clear={() => setLastName('')}
                  value={last_name}
                  ref={lastNameRef}
                  onChangeText={value => setLastName(value)}
                  returnKeyType="send"
                  onSubmitEditing={() => documentRef.current.focus()}
                />
              </InputContainer>

              <InputContainer>
                <InputMenu
                  label="NIF"
                  autoCorrect={false}
                  maxLength={45}
                  clear={() => setDocument('')}
                  value={document}
                  ref={documentRef}
                  onChangeText={value => setDocument(value)}
                  returnKeyType="send"
                  onSubmitEditing={() => cellphoneRef.current.focus()}
                />
              </InputContainer>

              <InputContainer>
                <InputMenu
                  label="Telemóvel"
                  autoCorrect={false}
                  maxLength={45}
                  clear={() => setCellphone('')}
                  value={cellphone}
                  ref={cellphoneRef}
                  onChangeText={value => setCellphone(value)}
                  returnKeyType="send"
                  onSubmitEditing={GoToShippingStep}
                />
              </InputContainer>

              <ProceedButton onPress={GoToShippingStep}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ProceedButtonText>Continuar</ProceedButtonText>
                )}
              </ProceedButton>
            </>
          )}

          {currentStep === 2 && (
            <>
              {loading && <ActivityIndicator size="large" color="#12b118" />}

              {!loading && shippingMethods.length > 0 && (
                <Picker>
                  {shippingMethods.map(item => (
                    <Picker.Item
                      key={item.id}
                      label={`${item.label} - ${
                        item.cost === 0
                          ? 'Grátis'
                          : `€ ${Number(item.cost).toFixed(2)}`
                      }`}
                      value={item.id}
                    />
                  ))}
                </Picker>
              )}

              {/* {!loading && addresses.length > 0 && (
                <Picker>
                  <Picker.Item label="Novo Endereço" value="new" />

                  {addresses.map(item => (
                    <Picker.Item
                      key={String(item.id)}
                      label={`${item.address} ${item.number} - ${item.zipcode} ${item.city} - ${item.state}`}
                      value={item.id}
                    />
                  ))}
                </Picker>
              )} */}

              {/* <InputContainer>
                <InputMenu
                  label="Código Postal"
                  maxLength={9}
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  clear={() => setZipcode('')}
                  value={zipcode}
                  onChangeText={setZipcode}
                  returnKeyType="next"
                  onSubmitEditing={() => numberRef.current.focus()}
                />
              </InputContainer>

              <InputContainer>
                <InputMenu
                  label="Número"
                  maxLength={5}
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

              <InputContainer>
                <InputMenu
                  label="Morada"
                  autoCorrect={false}
                  maxLength={45}
                  clear={() => setAddress('')}
                  ref={addressRef}
                  value={address}
                  onChangeText={setAddress}
                  returnKeyType="next"
                  onSubmitEditing={() => districtRef.current.focus()}
                />
              </InputContainer>

              <InputContainer>
                <InputMenu
                  label="Distrito"
                  autoCorrect={false}
                  maxLength={45}
                  clear={() => setDistrict('')}
                  ref={districtRef}
                  value={district}
                  onChangeText={setDistrict}
                  returnKeyType="next"
                  onSubmitEditing={() => cityRef.current.focus()}
                />
              </InputContainer>

              <InputContainer>
                <InputMenu
                  label="Cidade"
                  maxLength={35}
                  clear={() => setCity('')}
                  autoCorrect={false}
                  ref={cityRef}
                  value={city}
                  onChangeText={setCity}
                  returnKeyType="next"
                  onSubmitEditing={() => stateRef.current.focus()}
                />
              </InputContainer>

              <InputContainer>
                <InputMenu
                  label="Localidade"
                  maxLength={45}
                  autoCorrect={false}
                  clear={() => setState('')}
                  ref={stateRef}
                  value={state}
                  onChangeText={setState}
                  returnKeyType="send"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              </InputContainer>

              <ProceedButton onPress={GoToPaymentStep}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ProceedButtonText>Continuar</ProceedButtonText>
                )}
              </ProceedButton> */}
            </>
          )}
        </Container>
      </KeyboardAvoidingView>
    </>
  );
}
