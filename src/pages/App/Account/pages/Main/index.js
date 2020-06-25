import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View, PermissionsAndroid } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-tiny-toast';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
// import CameraRoll from '@react-native-community/cameraroll';

import {
  Avatar,
  AvatarContainer,
  Container,
  ChoosePhotoButton,
  Content,
  ImageContainer,
  Item,
  LogoutButton,
  VerifiedField,
  VerifiedFieldContainer,
  Field,
  Value,
} from './styles';

import Header from '~/components/HeaderMenu';

import { signOut } from '~/store/modules/auth/actions';
import { showTabBar } from '~/store/modules/user/actions';

import api from '~/services/api';

export default function Main() {
  const user = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const captureViewRef = useRef();

  const [profilePhoto, setProfilePhoto] = useState(
    'https://api.adorable.io/avatars/90/abott@adorable.png'
  );

  const [uploading, setUploading] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  useEffect(() => {
    dispatch(showTabBar());
  }, []);

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const handleUploadAvatar = useCallback(async () => {
    try {
      const uri = await captureRef(captureViewRef, {
        format: 'jpg',
        quality: 1,
      });

      if (!(await hasAndroidPermission())) {
        return;
      }

      // CameraRoll.save(uri, 'photo').then(() => {
      //   console.tron.log('Sucesso ao salvar na galeria.');
      // }); // então é um uri válido
      // console.tron.log('2');

      const upload = new FormData(); // eslint-disable-line

      upload.append('avatar', {
        uri,
        type: 'image/jpeg',
        name: `${user.name}-${Date.now()}.jpeg`,
      });

      const response = await api.post('clients/avatars', upload);

      Toast.showSuccess(response.data.meta.message);
    } catch (error) {
      Toast.show('Erro no atualização da foto de perfil.');
    }
    setUploading(false);
  }, [user.name]);

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
        const source = {
          uri: `data:image/jpeg;base64,${image.data}`,
        };
        setProfilePhoto(source.uri);
        setTimeout(() => handleUploadAvatar(), 1000);
      }
    });
  }, []);

  return (
    <>
      <Header title="Perfil" close={() => navigation.goBack()} />

      <Container
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 5,
        }}
      >
        <ImageContainer>
          <AvatarContainer ref={captureViewRef}>
            <Avatar source={{ uri: profilePhoto }} />
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

        <LogoutButton onPress={handleLogout}>Sair do aplicativo</LogoutButton>
      </Container>
    </>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};