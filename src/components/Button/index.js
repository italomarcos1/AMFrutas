import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { CustomButton, Text } from './styles';

export default function Button({
  children,
  textSize,
  style,
  loading,
  ...rest
}) {
  return (
    <CustomButton style={style} {...rest}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Text style={{ fontSize: textSize }} login>
          {children}
        </Text>
      )}
    </CustomButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
  loading: PropTypes.bool,
  login: PropTypes.bool,
};

Button.defaultProps = {
  style: {},
  loading: false,
  login: false,
};
