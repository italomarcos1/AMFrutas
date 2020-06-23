import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Welcome from '~/pages/Auth/Welcome';
import Main from './pages/Main';

export default function Account({ navigation }) {
  const signed = useSelector(state => state.auth.signed);

  const closeModal = () => {
    navigation.goBack();
  };

  return signed ? <Main /> : <Welcome closeModal={closeModal} />;
}

Account.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
