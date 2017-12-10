import * as React from "react";
import { Container, Header, Left, Right, Body, Content, Button, Title, Icon, Text } from "native-base";
import { InjectedProps } from "react-navigation";

import { styles } from "../common/styles";
import { IEnhancedAddressInfo, actions } from "../common/redux/coins";
import { AddressDetails } from "../components/AddressDetails";
import { connect } from "react-redux";
import { Alert } from "react-native";

interface IAddressDetailScreenDispatchProps {
  deleteAddress: (address: string) => void;
}

class AddressDetailScreenComponent extends React.Component<IAddressDetailScreenDispatchProps & InjectedProps> {
  static navigationOptions = {
    header: null
  }

  private handleDeletePress = () => {
    Alert.alert("Delete address", "Are you sure you want to delete this address?", [
      {text: 'Yes', onPress: this.performDeleteAddress},
      {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
    ], { cancelable: false })
  }

  private performDeleteAddress = () => {
    this.props.deleteAddress(this.props.navigation.state.params.address.address);
    this.props.navigation.goBack();
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
            <Title>Address Details</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.handleDeletePress}>
              <Icon name="trash" />
            </Button>
          </Right>
        </Header>
          <AddressDetails address={this.props.navigation.state.params.address} />
      </Container>
        );
  }
}

const mapDispatchToProps: IAddressDetailScreenDispatchProps = {
  deleteAddress: actions.deleteAddress,
}

export const AddressDetailScreen = connect(undefined, mapDispatchToProps)(AddressDetailScreenComponent);