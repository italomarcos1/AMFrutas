import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Feather';

import api from '~/services/api';

import {
  Container,
  Header,
  SubContainer,
  PhoneButton,
  OptionsContainer,
  OptionsTitle,
  Option,
  OptionText,
} from './styles';

import Phone from '~/assets/ico-menu-cellphone.svg';
import Logo from '~/assets/logo-white.svg';
import WhatsApp from '~/assets/ico-menu-whatsapp.svg';

export default function Menu({ navigation }) {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadMenu() {
      const [menuData, categoriesData] = await Promise.all([
        api.get('menu'),
        api.get(
          'ecommerce/categories/?recursively=1&per_page=13&order_field=slug&order_direction=asc'
        ),
      ]);

      setMenu(menuData.data.data);
      setCategories(categoriesData.data.data.data);
    }

    loadMenu();
  }, []);

  const sendWhatsappMessage = useCallback(() => {
    Linking.canOpenURL('whatsapp://send?phone=5561995807642').then(found => {
      if (found) {
        return Linking.openURL('whatsapp://send?phone=5561995807642');
      }

      return Linking.openURL(
        'https://api.whatsapp.com/send?phone=5561995807642'
      );
    });
  }, []);

  const instagramLink = useCallback(() => {
    return Linking.openURL('https://instagram.com/amfrutas');
  }, []);

  const facebookLink = useCallback(() => {
    return Linking.openURL('https://facebook.com/amfrutas');
  }, []);
  const youtubeLink = useCallback(() => {
    return Linking.openURL(
      'https://www.youtube.com/channel/UCYzO5SWwFOUX-6uheZv8eag'
    );
  }, []);

  return (
    <>
      <Header>
        <SubContainer>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon size={35} name="x" color="#EEE" />
          </TouchableOpacity>
          <Logo />
        </SubContainer>
        <SubContainer>
          <PhoneButton onPress={() => Linking.openURL('tel:61995807642')}>
            <Phone />
            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
              21 887 74 95
            </Text>
          </PhoneButton>
          <PhoneButton onPress={sendWhatsappMessage}>
            <WhatsApp />
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
              WhatsApp
            </Text>
          </PhoneButton>
        </SubContainer>
      </Header>
      <Container>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#12b118',
            flex: 1,
            height: 1280,
          }}
        >
          <OptionsContainer style={{ height: 270 }}>
            <OptionsTitle>Principal</OptionsTitle>
            <Option onPress={() => {}}>
              <OptionText>Promoções</OptionText>
            </Option>
            <Option onPress={() => {}}>
              <OptionText>Lojas</OptionText>
            </Option>
            <Option onPress={() => {}}>
              <OptionText>Condições Gerais de Venda</OptionText>
            </Option>
            <Option onPress={() => {}}>
              <OptionText>Minha conta</OptionText>
            </Option>
            <Option onPress={() => {}}>
              <OptionText>Carrinho de Compras</OptionText>
            </Option>
          </OptionsContainer>
          <OptionsContainer style={{ marginTop: 15, height: 495 }}>
            <OptionsTitle>Produtos</OptionsTitle>
            {categories.map(category => (
              <Option
                key={category.id}
                onPress={() => {
                  if (category.all_children_categories.length === 0) {
                    navigation.navigate('Category', {
                      id: category.id,
                    });
                  } else {
                    navigation.navigate('ChildrenCategory', {
                      categories: category.all_children_categories,
                    });
                  }
                }}
              >
                <OptionText>{category.name}</OptionText>
                {category.all_children_categories.length !== 0 ? (
                  <Icon name="plus" color="#000" size={20} />
                ) : (
                  <Icon />
                )}
              </Option>
            ))}
          </OptionsContainer>
          <OptionsContainer style={{ marginTop: 15, height: 360 }}>
            <OptionsTitle>Atendimento e Social</OptionsTitle>
            {menu.map(
              item =>
                !item.external && (
                  <Option
                    key={item.name}
                    onPress={() => {
                      navigation.navigate('Content', {
                        endpoint: item.endpoint,
                        title: item.name,
                      });
                    }}
                  >
                    <OptionText>{item.name}</OptionText>
                  </Option>
                )
            )}
            <Option onPress={facebookLink}>
              <OptionText>Facebook</OptionText>
            </Option>
            <Option onPress={instagramLink}>
              <OptionText>Instagram</OptionText>
            </Option>
            <Option onPress={youtubeLink}>
              <OptionText>Youtube</OptionText>
            </Option>
          </OptionsContainer>
          <View style={{ flex: 0.4 }} />
        </ScrollView>
      </Container>
    </>
  );
}

Menu.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
