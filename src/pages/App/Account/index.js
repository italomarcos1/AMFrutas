import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { captureRef } from 'react-native-view-shot';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-tiny-toast';
import Icon from 'react-native-vector-icons/Feather';

import Welcome from '~/pages/Auth/Welcome';

import {
  Avatar,
  AvatarContainer,
  Container,
  ChoosePhotoButton,
  Content,
  ImageContainer,
  Item,
  VerifiedField,
  VerifiedFieldContainer,
  Field,
  Value,
} from './styles';
import Button from '~/components/Button';

import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';

export default function Account({ navigation }) {
  const signed = useSelector(state => state.auth.signed);
  const user = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const captureViewRef = useRef();

  const Stack = createStackNavigator();
  // campo address e gender no usuário

  const [profilePhoto, setProfilePhoto] = useState(
    'https://api.adorable.io/avatars/90/abott@adorable.png'
  );

  const [uploading, setUploading] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const handleUploadAvatar = useCallback(async () => {
    try {
      const uri = await captureRef(captureViewRef, {
        format: 'png',
        quality: 1,
      });

      const upload = new FormData();

      upload.append('avatar', {
        uri,
        type: 'image/jpeg',
        name: `${user.name}.jpeg`,
      });

      const response = await api.post('clients/avatars', upload);

      Toast.showSuccess(response.data.meta.message);
    } catch (error) {
      Toast.show('Erro no atualização da foto de perfil.');
    }
    setUploading(false);
  }, []);

  const handleChoosePhoto = useCallback(() => {
    const options = {
      title: 'Selecionar imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar foto',
      chooseFromLibraryButtonTitle: 'Selecionar imagem da galeria',
      mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, image => {
      setUploading(true);

      if (image.error) Toast.show('Erro ao selecionar a imagem.');
      else {
        const photo = `data:image/jpeg;base64,${image.data}`;
        setProfilePhoto(photo);
        handleUploadAvatar();
      }
    });
  }, [handleUploadAvatar]);

  return signed ? (
    <Container
      contentContainerStyle={{
        height: 520,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 30,
      }}
    >
      <ImageContainer>
        <AvatarContainer>
          <Image
            ref={captureViewRef}
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              borderColor: '#fff',
              borderWidth: 2,
            }}
            source={{ uri: profilePhoto }}
          />
        </AvatarContainer>

        <ChoosePhotoButton disabled={uploading} onPress={handleChoosePhoto}>
          {uploading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Icon name="camera" color="#fff" size={22} />
          )}
        </ChoosePhotoButton>
      </ImageContainer>

      <View style={{ flex: 1, paddingBottom: 15 }}>
        <Content>
          <Item onPress={() => navigation.navigate('EditName')}>
            <Field>Nome</Field>
            <Value>
              {user.name} {user.last_name}
            </Value>
          </Item>
        </Content>

        <Content>
          <Item onPress={() => navigation.navigate('Gender')}>
            <Field>Sexo</Field>
            <Value>Masculino</Value>
          </Item>
          <Icon name="chevron-right" size={15} color="#808080" />
        </Content>

        <Content>
          <Item
            disabled={!!user.email_verified}
            onPress={() => navigation.navigate('Mail')}
          >
            <VerifiedFieldContainer>
              <Field>E-mail</Field>
              <VerifiedField verified={!!user.email_verified}>
                {user.email_verified ? 'Verificado' : 'Não-verificado'}
              </VerifiedField>
            </VerifiedFieldContainer>

            <Value>{user.email}</Value>
          </Item>
          <Icon name="chevron-right" size={15} color="#808080" />
        </Content>

        <Content>
          <Item onPress={() => navigation.navigate('Pass')}>
            <Field>Palavra-passe</Field>
            <Value>******</Value>
          </Item>
          <Icon name="chevron-right" size={15} color="#808080" />
        </Content>

        <Content>
          <Item
            onPress={() => navigation.navigate('Shipping')}
            style={{ borderBottomColor: 'transparent', borderBottomWidth: 0 }}
          >
            <Field>Endereços de entrega</Field>
            <Value>Casa</Value>
          </Item>
          <Icon name="chevron-right" size={15} color="#808080" />
        </Content>

        <Content>
          <Item
            onPress={() => navigation.navigate('Orders')}
            style={{ borderBottomColor: 'transparent', borderBottomWidth: 0 }}
          >
            <Field />
            <Value>Minhas compras</Value>
          </Item>
          <Icon name="chevron-right" size={15} color="#808080" />
        </Content>
      </View>

      <Button
        style={{
          backgroundColor: '#f53030',
          height: 45,
          maxWidth: 200,
          borderRadius: 30,
        }}
        onPress={handleLogout}
      >
        Sair do aplicativo
      </Button>
    </Container>
  ) : (
    <Stack.Navigator headerMode="none" initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

Account.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
