import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-tiny-toast';

import {
  Container,
  Option,
  OptionsContainer,
  Selected,
  RadioButtonBackground,
  RadioText,
} from './styles';

import Header from '~/components/HeaderMenu';
import Button from '~/components/Button';

import { updateProfileSuccess } from '~/store/modules/user/actions';

import api from '~/services/api';

export default function Gender({ navigation, route }) {
  const { currentGender } = route.params;

  const [gender, setGender] = useState(currentGender);

  const dispatch = useDispatch();

  const [updating, setUpdating] = useState(false);

  const handleUpdateGender = useCallback(async () => {
    try {
      setUpdating(true);

      const { data } = await api.put('clients', { gender });
      const updatedUser = data.data;

      Toast.showSuccess('Gênero atualizado com sucesso.');
      setUpdating(false);

      dispatch(updateProfileSuccess(updatedUser));
      navigation.goBack();
    } catch (err) {
      setUpdating(false);

      Toast.show('Erro na atualização do gênero');
    }
  }, [gender, dispatch, navigation]);

  return (
    <>
      <Header title="Sexo" close={() => navigation.goBack()} />

      <Container>
        <OptionsContainer>
          <Option disabled={updating} onPress={() => setGender('Masculino')}>
            <RadioButtonBackground>
              <Selected selected={gender === 'Masculino'} />
            </RadioButtonBackground>
            <RadioText>Masculino</RadioText>
          </Option>

          <Option disabled={updating} onPress={() => setGender('Feminino')}>
            <RadioButtonBackground>
              <Selected selected={gender === 'Feminino'} />
            </RadioButtonBackground>
            <RadioText>Feminino</RadioText>
          </Option>

          <Option disabled={updating} onPress={() => setGender('Outro')}>
            <RadioButtonBackground>
              <Selected selected={gender === 'Outro'} />
            </RadioButtonBackground>
            <RadioText>Outro</RadioText>
          </Option>
        </OptionsContainer>

        <Button
          loading={updating}
          textSize={18}
          onPress={handleUpdateGender}
          style={{
            backgroundColor: '#3b8e39',
            borderRadius: 4,
            width: '100%',
            marginTop: 15,
          }}
        >
          Salvar
        </Button>
      </Container>
    </>
  );
}

Gender.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      currentGender: PropTypes.string,
    }),
  }).isRequired,
};
