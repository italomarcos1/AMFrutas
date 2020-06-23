import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import { Container, CustomInput } from './styles';

Icon.loadFont();

function Input({ icon, style, login, ...rest }, ref) {
  return (
    <Container style={style} login>
      {icon && <Icon name={icon} size={16} color="#999" />}
      <CustomInput ref={ref} {...rest} placeholderTextColor="#999" />
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  login: PropTypes.bool,
};

Input.defaultProps = {
  icon: null,
  login: false,
  style: {},
};

export default forwardRef(Input);
