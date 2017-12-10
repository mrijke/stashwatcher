import * as React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/es/integration/react";
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content } from "native-base";
import * as Expo from "expo";

import { store, persistor } from './common/redux/index';
import { AddAddressScreen } from './screens/AddAddressScreen';
import { HomeScreen } from './screens/HomeScreen';

export default class App extends React.Component<{}, { fontLoaded: boolean }> {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'cryptocoins': require('./assets/fonts/cryptocoins.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  public constructor(props: {}) {
    super(props);
    this.state = { fontLoaded: false }
    // AsyncStorage.clear();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {this.state.fontLoaded ? <RootNavigator /> : null}
        </PersistGate>
      </Provider>
    );
  }
}

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  AddAddress: {
    screen: AddAddressScreen,
  },
});
