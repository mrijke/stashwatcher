import * as React from "react";
import { ActivityIndicator } from "react-native";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { PersistGate } from "redux-persist/es/integration/react";
import { Text } from "native-base";
import "intl";
import "intl/locale-data/jsonp/nl";

import { store, persistor } from "./common/redux/index";
import { HomeScreen } from "./screens/HomeScreen";
import { AddAddressScreen } from "./screens/AddAddressScreen";
import { AddressDetailScreen } from "./screens/AddressDetailScreen";
import { QRCodeCameraScreen } from "./screens/QRCodeCameraScreen";
import { styles } from "./common/styles";

const Loading = <ActivityIndicator style={styles.loading} color="#0000ff" size="large" />;

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  AddAddress: {
    screen: AddAddressScreen
  },
  AddressDetail: {
    screen: AddressDetailScreen
  },
  QRCodeScan: {
    screen: QRCodeCameraScreen
  }
});

export default class App extends React.Component {
  public constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <IntlProvider textComponent={Text} locale="en">
          <PersistGate persistor={persistor} loading={Loading}>
            <RootNavigator />
          </PersistGate>
        </IntlProvider>
      </Provider>
    );
  }
}