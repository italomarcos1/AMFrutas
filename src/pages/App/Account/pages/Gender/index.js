import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Option,
  OptionsContainer,
  Selected,
  RadioButtonBackground,
  RadioText,
} from './styles';

import ButtonMenu from '~/components/ButtonMenu';

export default function Gender({ navigation }) {
  // habilitar pro valor retornado no 'useSelector'
  // puxar valor do perfil no redux. com o hook 'useSelector'
  // action para atualizar esse campo
  // assim, a preferência das camisetas no design será baseado nisso
  const [gender, setGender] = useState('Masculino');

  return (
    <Container>
      <OptionsContainer>
        <Option onPress={() => setGender('Masculino')}>
          <RadioButtonBackground>
            <Selected selected={gender === 'Masculino'} />
          </RadioButtonBackground>
          <RadioText>Masculino</RadioText>
        </Option>

        <Option onPress={() => setGender('Feminino')}>
          <RadioButtonBackground>
            <Selected selected={gender === 'Feminino'} />
          </RadioButtonBackground>
          <RadioText>Feminino</RadioText>
        </Option>

        <Option onPress={() => setGender('Outro')}>
          <RadioButtonBackground>
            <Selected selected={gender === 'Outro'} />
          </RadioButtonBackground>
          <RadioText>Outro</RadioText>
        </Option>
      </OptionsContainer>
      <ButtonMenu
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20, fontSize: 20 }}
      >
        Gravar
      </ButtonMenu>
    </Container>
  );
}

Gender.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
