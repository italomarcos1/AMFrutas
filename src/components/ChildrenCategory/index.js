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
  Line,
} from './styles';

export default function ChildrenCategory({ route, navigation }) {
  const { categories, categoryName } = route.params;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12b118" />
      <Header />
      <Container>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#12b118',
            flex: 1,
          }}
        >
          <OptionsContainer>
            <OptionsTitle>{categoryName}</OptionsTitle>
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
        </ScrollView>
      </Container>
    </>
  );
}

ChildrenCategory.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      categories: PropTypes.oneOfType([PropTypes.array]),
      categoryName: PropTypes.string,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
