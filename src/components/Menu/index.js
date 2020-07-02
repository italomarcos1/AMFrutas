import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import api from '~/services/api';

import {
  Container,
  Header,
  SubContainer,
  PhoneButton,
  PhoneButtonText,
  Line,
  OptionsContainer,
  OptionsTitle,
  Option,
  OptionText,
} from './styles';

import PhoneIcon from '~/assets/ico-menu-cellphone.svg';
import Logo from '~/assets/logo-white.svg';
import WhatsAppIcon from '~/assets/ico-menu-whatsapp.svg';

export default function Menu({ navigation }) {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [whatsappNumber, setWhatsappNumber] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      setLoading(true);
      const [menuData, categoriesData] = await Promise.all([
        api.get('menu'),
        api.get(
          'ecommerce/categories/?recursively=1&per_page=13&order_field=slug&order_direction=asc'
        ),
      ]);

      setPhoneNumber(menuData.data.data.phone);
      setWhatsappNumber(menuData.data.data.whatsapp);

      setMenu(menuData.data.data.links);
      setCategories(categoriesData.data.data.data);
      setLoading(false);
    }

    loadMenu();
  }, []);

  const generatePlaceholderBoxes = useCallback(items => {
    const list = [];

    let i = 0;
    while (i < items) {
      const width = Math.random() * (100 - 10) + 10;

      list.push({
        key: `box${i}`,
        width: `${width}%`,
        height: 40,
        marginVertical: 2,
      });
      i += 1;
    }

    return list;
  }, []);

  const sendWhatsappMessage = useCallback(() => {
    const appUri = `whatsapp://send?phone=${whatsappNumber}`;
    const browserUri = `https://api.whatsapp.com/send?phone=${whatsappNumber}`;

    Linking.canOpenURL(appUri).then(found => {
      if (found) return Linking.openURL(appUri);

      return Linking.openURL(browserUri);
    });
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
          <PhoneButton onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
            <PhoneIcon />
            <PhoneButtonText>Ligar Agora</PhoneButtonText>
          </PhoneButton>

          <PhoneButton onPress={sendWhatsappMessage}>
            <WhatsAppIcon />
            <PhoneButtonText whatsapp>WhatsApp</PhoneButtonText>
          </PhoneButton>
        </SubContainer>
      </Header>

      <Container>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#12b118',
            flex: 1,
            paddingBottom: 10,
          }}
        >
          {loading ? (
            <OptionsContainer style={{ padding: 0 }}>
              <OptionsTitle>Produtos</OptionsTitle>
              <SkeletonContent
                containerStyle={{
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
                duration={2000}
                isLoading={loading}
                layout={generatePlaceholderBoxes(13)}
              />
            </OptionsContainer>
          ) : (
            <OptionsContainer>
              <OptionsTitle>Produtos</OptionsTitle>

              {categories.map(category => (
                <>
                  <Line />

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
                          categoryName: category.name,
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
                </>
              ))}
            </OptionsContainer>
          )}
          {loading ? (
            <OptionsContainer style={{ padding: 0 }}>
              <OptionsTitle>Atendimento e Social</OptionsTitle>
              <SkeletonContent
                containerStyle={{
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
                duration={2000}
                isLoading={loading}
                layout={generatePlaceholderBoxes(7)}
              />
            </OptionsContainer>
          ) : (
            <OptionsContainer>
              <OptionsTitle>Atendimento e Social</OptionsTitle>
              {menu.map(item => (
                <>
                  <Line />

                  {!item.external ? (
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
                  ) : (
                    <Option onPress={() => Linking.openURL(item.endpoint)}>
                      <OptionText>{item.name}</OptionText>
                    </Option>
                  )}
                </>
              ))}
            </OptionsContainer>
          )}
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
