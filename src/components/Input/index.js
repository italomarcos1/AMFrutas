import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import { Container, CustomInput } from './styles';

Icon.loadFont();

function Input({ icon, style, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={16} color="#333" />}
      <CustomInput ref={ref} {...rest} placeholderTextColor="#333" />
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(Input);
