import './config/ReactotronConfig';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

import { Alert, StatusBar, BackHandler, Linking } from 'react-native';
import Toast from 'react-native-tiny-toast';
import VersionCheck from 'react-native-version-check';
import Routes from './routes';

import { store, persistor } from './store';

function Index() {
  const checkVersion = async () => {
    try {
      const updateNeed = await VersionCheck.needUpdate();

      if (updateNeed && updateNeed.isNeeded) {
        Alert.alert(
          'Por favor atualize',
          'Você precisa atualizar o aplicativo para a última versão para continuar comprando.',
          [
            {
              text: 'Atualizar',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeed.storeUrl);
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      Toast.show(error);
    }
  };

  useEffect(() => {
    checkVersion();
  }, []);

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

export default Index;
