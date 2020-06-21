import React from 'react';

import Header from '~/components/Header';
import TopMenu from '~/components/TopMenu';

export default function Search({ navigation, route }) {
  return (
    <>
      <Header />
      <TopMenu navigation={navigation} route={route} />
    </>
  );
}
