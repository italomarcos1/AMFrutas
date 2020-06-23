import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { updateProfileSuccess } from '~/store/modules/user/actions';

import api from '~/services/api';

export default function Gender({ navigation }) {
  const user = useSelector(state => state.user.profile);
  const [gender, setGender] = useState(user.gender);
  const [updatedGender, setUpdatedGender] = useState('none');

  const dispatch = useDispatch();

  const [updating, setUpdating] = useState(false);

  const updateGender = useCallback(async () => {
    try {
      setUpdating(true);
      switch (updatedGender) {
        case 'Masculino': {
          setUpdatedGender('male');
          break;
        }
        case 'Feminino': {
          setUpdatedGender('female');
          break;
        }
        case 'Outro': {
          setUpdatedGender('other');
          break;
        }
        default:
      }

      const {
        data: { data },
      } = await api.put('clients', { gender: updatedGender });
      dispatch(updateProfileSuccess(data));
      Toast.showSuccess('Gênero atualizado com sucesso.');
      setUpdating(false);
    } catch (err) {
      setUpdating(false);
      Toast.show('Erro na atualização do gênero');
    }
  }, [updatedGender, dispatch]);

  useEffect(() => {
    updateGender();
  }, [gender]);

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
      </Container>
    </>
  );
}

Gender.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
