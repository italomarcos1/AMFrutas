import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  BackHandler,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  Picker,
  ScrollView,
  View,
} from 'react-native';
import Toast from 'react-native-tiny-toast';

import Header from '~/components/HeaderMenu';
import InputMenu from '~/components/InputMenu';

import { cleanCart } from '~/store/modules/cart/actions';
import { updateProfileSuccess, setOrder } from '~/store/modules/user/actions';

import api from '~/services/api';

import {
  ActivityIndicatorContainer,
  StepsContainer,
  Step,
  StepText,
  Container,
  AlertMessage,
  WarningMessage,
  InputContainer,
  ProceedButton,
  ProceedButtonText,
  PickerContainer,
  PickerLabel,
  Separator,
  Card,
  CardTitle,
  CardRow,
  CardLabel,
  Small,
} from './styles';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.user.profile);
  const products = useSelector(state => state.cart.products);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState(
    'Preencha todos os campos para continuar!'
  );
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);

  const [name, setName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [document, setDocument] = useState(null);
  const [cellphone, setCellphone] = useState(null);

  const lastNameRef = useRef();
  const documentRef = useRef();
  const cellphoneRef = useRef();

  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);

  const [deliveryIntervals, setDeliveryIntervals] = useState([]);
  const [selectedDeliveryInterval, setSelectedDeliveryInterval] = useState(
    null
  );

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('new');

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

  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!user || !products.length) navigation.navigate('Bag');
        return true;
      };

      if (!user || !products.length) navigation.navigate('Bag');
      else {
        setName(user.name.length ? user.name : '');
        setLastName(user.last_name.length ? user.last_name : '');
        setDocument(user.document.length ? user.document : '');
        setEmail(user.email.length ? user.email : '');
        setCellphone(user.cellphone.length ? user.cellphone : '');
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const handleGoToShippingStep = useCallback(async () => {
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

  const handleGoToPaymentStep = useCallback(async () => {
    if (selectedShippingMethod === null) {
      setAlertMessage('Selecione o método de entrega.');
      setAlertMessageVisible(true);
    } else if (
      selectedShippingMethod.id === 'delivery' &&
      selectedDeliveryInterval === null
    ) {
      setAlertMessage('Selecione o período para entrega.');
      setAlertMessageVisible(true);
    } else if (
      zipcode === null ||
      address === null ||
      city === null ||
      district === null
    ) {
      setAlertMessage('Preencha todos os campos da morada.');
      setAlertMessageVisible(true);
    } else if (selectedAddress === 'new') {
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
      selectedAddress !== 'new' &&
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
      setCurrentStep(3);
    }
  }, [
    address,
    city,
    dispatch,
    district,
    number,
    selectedAddress,
    selectedDeliveryInterval,
    selectedShippingMethod,
    state,
    user,
    zipcode,
  ]);

  const handleConfirmPurchase = useCallback(async () => {
    try {
      Toast.show('Processando sua Encomenda...\nPor favor aguarde.', {
        loading: true,
        position: Toast.position.CENTER,
        duration: 0,
      });

      const {
        data: {
          data: { transaction },
        },
        data: {
          meta: { message },
        },
      } = await api.post('checkout', {
        shipping_address: selectedAddress,
        shippingMethod: selectedShippingMethod.id,
        products,
        deliveryInterval:
          selectedShippingMethod.id === 'delivery'
            ? selectedDeliveryInterval.id
            : null,
      });

      dispatch(setOrder({ ...transaction }));

      dispatch(cleanCart());

      Toast.hide();

      navigation.navigate('PurchaseConfirmation', {
        message,
      });
    } catch (err) {
      Toast.hide();
      Toast.show(err);
    }
  });

  const clearAddressForm = useCallback(() => {
    setZipcode(null);
    setAddress(null);
    setNumber(null);
    setDistrict(null);
    setCity(null);
    setState(null);
  }, []);

  useEffect(() => {
    if (!user || !products.length) navigation.navigate('Bag');

    async function loadAddresses() {
      try {
        setLoading(true);

        const { data } = await api.get('clients/addresses');

        if (data.meta.message !== 'Você ainda não tem endereços cadastrados.') {
          setAddresses(data.data);

          setSelectedAddress(data.data[0]);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    async function loadShippingMethods() {
      try {
        setLoading(true);

        const { data } = await api.get(
          `checkout/shipping-methods?subtotal=${subtotal}`
        );

        setShippingMethods(data.data);
        setSelectedShippingMethod(data.data[0]);

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    function handleCalculateSubtotal() {
      setSubtotal(
        products.reduce((totalSum, product) => {
          return totalSum + product.price * product.qty;
        }, 0)
      );
    }

    async function loadShippingCost() {
      if (selectedShippingMethod.id === 'withdrawinstore') setShippingCost(0);
      else {
        try {
          const { data } = await api.get(
            `checkout/shipping-cost?subtotal=${subtotal}`
          );

          setShippingCost(data.data);
        } catch (err) {
          setLoading(false);
        }
      }
    }

    if (currentStep === 2) {
      clearAddressForm();
      loadAddresses();
      handleCalculateSubtotal();
      loadShippingMethods();
    }

    if (currentStep === 3) {
      setLoading(true);

      loadShippingCost();
      // loadDiscount();

      setLoading(false);
    }
  }, [currentStep]);

  useEffect(() => {
    async function loadDeliveryIntervals() {
      try {
        setLoading(true);

        const { data } = await api.get('checkout/delivery-intervals');

        setDeliveryIntervals(data.data);
        setSelectedDeliveryInterval(data.data[0]);

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    if (
      selectedShippingMethod !== null &&
      selectedShippingMethod.id === 'delivery'
    )
      loadDeliveryIntervals();
  }, [selectedShippingMethod]);

  useEffect(() => {
    if (selectedAddress === 'new') clearAddressForm();
    else {
      setZipcode(selectedAddress.zipcode);
      setAddress(selectedAddress.address);
      setNumber(selectedAddress.number);
      setDistrict(selectedAddress.district);
      setCity(selectedAddress.city);
      setState(selectedAddress.state);
    }
  }, [selectedAddress]);

  useEffect(() => {
    function handleCalculateTotal() {
      setTotal(subtotal + shippingCost - discount);
    }

    if (currentStep === 3) handleCalculateTotal();
  }, [subtotal, shippingCost, discount, currentStep]);

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
          {loading && (
            <ActivityIndicatorContainer>
              <ActivityIndicator size="large" color="#12b118" />
            </ActivityIndicatorContainer>
          )}

          <ScrollView>
            <AlertMessage visible={alertMessageVisible}>
              {alertMessage}
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
                    onSubmitEditing={handleGoToShippingStep}
                  />
                </InputContainer>

                <ProceedButton onPress={handleGoToShippingStep}>
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
                {shippingMethods.length > 0 && (
                  <PickerContainer>
                    <PickerLabel>Método de entrega</PickerLabel>

                    <Picker
                      prompt="Selecione o método de entrega"
                      selectedValue={
                        selectedShippingMethod !== null
                          ? selectedShippingMethod
                          : null
                      }
                      onValueChange={itemValue =>
                        setSelectedShippingMethod(itemValue)
                      }
                    >
                      {shippingMethods.map(item => (
                        <Picker.Item
                          key={item.id}
                          label={`${item.label} - ${
                            item.cost === 0
                              ? 'Grátis'
                              : `€ ${Number(item.cost).toFixed(2)}`
                          }`}
                          value={item}
                        />
                      ))}
                    </Picker>
                  </PickerContainer>
                )}

                <WarningMessage
                  visible={
                    selectedShippingMethod !== null &&
                    selectedShippingMethod.id === 'withdrawinstore'
                  }
                >
                  A retirada na loja deve ocorrer no endereço abaixo: Av. da
                  República 1058 2775-271 Parede
                </WarningMessage>

                {selectedShippingMethod !== null &&
                  selectedShippingMethod.id === 'delivery' &&
                  deliveryIntervals.length > 0 && (
                    <PickerContainer>
                      <PickerLabel>Período para entrega</PickerLabel>

                      <Picker
                        prompt="Selecione o melhor período"
                        selectedValue={
                          selectedDeliveryInterval !== null
                            ? selectedDeliveryInterval
                            : null
                        }
                        onValueChange={itemValue =>
                          setSelectedDeliveryInterval(itemValue)
                        }
                      >
                        {deliveryIntervals.map(item => (
                          <Picker.Item
                            key={item.id}
                            label={item.label}
                            value={item.id}
                          />
                        ))}
                      </Picker>
                    </PickerContainer>
                  )}

                <Separator />

                {!loading && addresses.length > 0 && (
                  <PickerContainer>
                    <PickerLabel>Morada para entrega</PickerLabel>

                    <Picker
                      prompt="Selecione a morada"
                      selectedValue={
                        selectedAddress !== null ? selectedAddress : null
                      }
                      onValueChange={itemValue => setSelectedAddress(itemValue)}
                    >
                      <Picker.Item label="Nova morada" value="new" />

                      {addresses.map(item => (
                        <Picker.Item
                          key={item.id}
                          label={`${item.address} ${item.number} - ${item.zipcode} ${item.city} - ${item.state}`}
                          value={item}
                        />
                      ))}
                    </Picker>
                  </PickerContainer>
                )}

                <View>
                  <InputContainer>
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
                      label="Número/Andar"
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
                </View>

                <ProceedButton onPress={handleGoToPaymentStep}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ProceedButtonText>Continuar</ProceedButtonText>
                  )}
                </ProceedButton>
              </>
            )}

            {currentStep === 3 && (
              <>
                <Card>
                  <CardTitle>Produtos</CardTitle>

                  <CardRow>
                    <CardLabel bold width={70}>
                      Item
                    </CardLabel>
                    <CardLabel bold align="center" width={10}>
                      Qtd
                    </CardLabel>
                    <CardLabel bold align="right" width={20}>
                      Subtotal
                    </CardLabel>
                  </CardRow>

                  {products.map(item => (
                    <CardRow key={item.id}>
                      <CardLabel width={72}>
                        {item.name} <Small>(€{item.price.toFixed(2)})</Small>
                      </CardLabel>
                      <CardLabel width={8} align="center">
                        {item.qty}
                      </CardLabel>
                      <CardLabel width={20} align="right">
                        € {(item.qty * item.price).toFixed(2)}
                      </CardLabel>
                    </CardRow>
                  ))}
                </Card>

                <Card>
                  <CardRow noMargin>
                    <CardLabel>
                      Nome: {name} {last_name}
                    </CardLabel>
                  </CardRow>

                  <CardRow>
                    <CardLabel>Email: {email}</CardLabel>
                  </CardRow>

                  <CardRow>
                    <CardLabel>NIF: {document}</CardLabel>
                  </CardRow>

                  <CardRow>
                    <CardLabel>Telemóvel: {cellphone}</CardLabel>
                  </CardRow>
                </Card>

                <Card>
                  <CardRow>
                    <CardLabel>Entrega:</CardLabel>
                    <CardLabel>{selectedShippingMethod.label}</CardLabel>
                  </CardRow>

                  {selectedShippingMethod.id === 'delivery' && (
                    <CardRow>
                      <CardLabel>Agendado para:</CardLabel>
                      <CardLabel>{selectedDeliveryInterval.label}</CardLabel>
                    </CardRow>
                  )}
                </Card>

                <Card>
                  <CardTitle>Resumo do Pedido</CardTitle>

                  <CardRow>
                    <CardLabel>Subtotal:</CardLabel>
                    <CardLabel>€ {Number(subtotal).toFixed(2)}</CardLabel>
                  </CardRow>

                  <CardRow>
                    <CardLabel>Porte:</CardLabel>
                    <CardLabel>
                      {shippingCost > 0
                        ? `€ ${Number(shippingCost).toFixed(2)}`
                        : 'Grátis'}
                    </CardLabel>
                  </CardRow>

                  <CardRow>
                    <CardLabel>Desconto:</CardLabel>
                    <CardLabel>€ {Number(discount).toFixed(2)}</CardLabel>
                  </CardRow>

                  <CardRow>
                    <CardLabel>Total:</CardLabel>
                    <CardLabel>€ {Number(total).toFixed(2)}</CardLabel>
                  </CardRow>
                </Card>

                <ProceedButton onPress={handleConfirmPurchase}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ProceedButtonText>Confirmar encomenda</ProceedButtonText>
                  )}
                </ProceedButton>
              </>
            )}
          </ScrollView>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
}
