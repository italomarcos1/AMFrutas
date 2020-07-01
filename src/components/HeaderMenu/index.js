import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import { Container, Title, CloseHeader } from './styles';

Icon.loadFont();

export default function Header({ title, close, custom }) {
  return (
    <Container custom={custom}>
      <CloseHeader custom={custom} onPress={close}>
        <Icon name="chevron-left" color={custom ? '#000' : '#fff'} size={35} />
      </CloseHeader>
      <Title custom={custom}>{title}</Title>
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
