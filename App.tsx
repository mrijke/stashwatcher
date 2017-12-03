import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/es/integration/react";

import { store, persistor } from './common/redux/index';
import { CoinListContainer } from './components/CoinListContainer';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <PersistGate persistor={persistor}>
            <CoinListContainer />
          </PersistGate>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
