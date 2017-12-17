import * as React from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { StackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { PersistGate } from "redux-persist/es/integration/react";
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content, Text } from "native-base";
import * as Expo from "expo";
import "intl";
import 'intl/locale-data/jsonp/nl';

import { store, persistor } from './common/redux/index';
import { HomeScreen } from './screens/HomeScreen';
import { AddAddressScreen } from './screens/AddAddressScreen';
import { AddressDetailScreen } from './screens/AddressDetailScreen';
import { styles } from './common/styles';
import { API } from './common/api/ApiClient';

const Loading = <ActivityIndicator style={styles.loading} color="#0000ff" size="large" />;

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
        <IntlProvider textComponent={Text} locale="en">
          <PersistGate persistor={persistor} loading={Loading}>
            {this.state.fontLoaded ? <RootNavigator /> : Loading}
          </PersistGate>
        </IntlProvider>
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
  AddressDetail: {
    screen: AddressDetailScreen,
  }
});
