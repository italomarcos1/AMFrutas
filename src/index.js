import { Client } from 'bugsnag-react-native';
import './config/ReactotronConfig';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import CodePush from 'react-native-code-push';

import { StatusBar } from 'react-native';
import Routes from './routes';

import { store, persistor } from './store';

function Index() {
  const bugsnag = new Client('45eb874b1b891f96bb18c9def406cbd3');
  bugsnag.notify(new Error('Test error'));

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#12b118" />
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
