import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Title } from './styles';

Icon.loadFont();

export default function Header({ title, close, custom }) {
  return (
    <Container custom={custom}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          custom={custom}
          onPress={close}
          style={{ width: 30, height: 30, borderRadius: 15, marginRight: 15 }}
        >
          <Icon
            name="chevron-left"
            color={custom ? '#000' : '#fff'}
            size={35}
          />
        </TouchableOpacity>
        <Title custom={custom}>{title}</Title>
      </View>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  custom: PropTypes.bool,
};

Header.defaultProps = {
  custom: false,
};
