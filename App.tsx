import * as React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/es/integration/react";
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content } from "native-base";
import * as Expo from "expo";

import { store, persistor } from './common/redux/index';
import { CoinListContainer } from './components/CoinListContainer';
import { AddAddressForm } from './components/forms/AddAddressForm';

export default class App extends React.Component<{}, { fontLoaded: boolean }> {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  public constructor(props: {}) {
    super(props);
    this.state = { fontLoaded: false }
    AsyncStorage.clear();
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

class HomeScreen extends React.Component<any> {
  static navigationOptions = {
    header: null,
  }

  public render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>CoinWatcher</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='add' onPress={() => this.props.navigation.navigate("AddAddress")} />
            </Button>
          </Right>
        </Header>
        <Content>
          <CoinListContainer />
        </Content>
      </Container>
    )
  }
}

class AddAddressScreen extends React.Component<any> {
  static navigationOptions = {
    header: null
  }
  public render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add new address</Title>
          </Body>
        </Header>
        <Content>
          <AddAddressForm />
        </Content>
      </Container>
    )
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
