import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-tiny-toast';
import api from '~/services/api';

import Validation from '~/components/Validation';
import InputMenu from '~/components/InputMenu';
import ButtonMenu from '~/components/ButtonMenu';
import Header from '~/components/HeaderMenu';

import { Container, InputContainer, InputName } from './styles';

import { updateProfileSuccess } from '~/store/modules/user/actions';

export default function EditName({ navigation, route }) {
  const { currentName, currentLastName } = route.params;

  const [name, setName] = useState(currentName);
  const [last_name, setLastName] = useState(currentLastName);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  const lastNameRef = useRef();

  const handleEditName = useCallback(async () => {
    try {
      setLoading(true);

      await api.put('clients', { name, last_name });
      const updatedUser = { ...user, name, last_name };

      Toast.showSuccess('Nome atualizado com sucesso.');
      setLoading(false);

      dispatch(updateProfileSuccess(updatedUser));
      navigation.goBack();
    } catch (err) {
      setLoading(false);

      Toast.show('Erro ao alterar nome.');
    }
  }, [name, dispatch, navigation, last_name]);

  return (
    <>
      <Header title="Nome do perfil" close={() => navigation.goBack()} />

      <Validation title="Edite seu nome e sobrenome" />
      <Container>
        <InputContainer style={{ marginBottom: 0 }}>
          <InputName>Nome</InputName>
          <InputMenu
            autoFocus
            selected={!!name}
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
        <InputContainer style={{ marginTop: 0 }}>
          <InputName>Sobrenome</InputName>
          <InputMenu
            selected={!!last_name}
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={45}
            clear={() => setLastName('')}
            value={last_name}
            ref={lastNameRef}
            onChangeText={value => setLastName(value)}
            returnKeyType="send"
            onSubmitEditing={handleEditName}
          />
        </InputContainer>

        <ButtonMenu
          loading={loading}
          style={{ marginTop: 20 }}
          onPress={handleEditName}
          disabled={!name || !last_name}
        >
          Alterar nome
        </ButtonMenu>
      </Container>
    </>
  );
}

EditName.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      currentName: PropTypes.string,
      currentLastName: PropTypes.string,
    }),
  }).isRequired,
};
