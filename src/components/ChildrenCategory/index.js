import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import Header from '~/components/Header';

import {
  Container,
  OptionsContainer,
  OptionsTitle,
  Option,
  OptionText,
} from './styles';

export default function ChildrenCategory({ route, navigation }) {
  const { categories } = route.params;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#feb118" />
      <Header />
      <Container>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#12b118',
            height: 600,
          }}
        >
          <OptionsContainer style={{ marginTop: 15, height: 540 }}>
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
        </ScrollView>
      </Container>
    </>
  );
}

ChildrenCategory.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      categories: PropTypes.oneOfType([PropTypes.array]),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
