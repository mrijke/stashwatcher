import * as React from "react";
import { StyleSheet } from "react-native";
import { Container, Header, Left, Body, Content, Button, Title, Icon, Text } from "native-base";

import { AddAddressForm } from "../components/forms/AddAddressForm";
import { styles } from "../common/styles";

export class AddAddressScreen extends React.Component<any> {
  static navigationOptions = {
    // tslint:disable-next-line:no-null-keyword
    header: null
  };
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
          <AddAddressForm navigation={this.props.navigation} />
          <Button full onPress={() => this.props.navigation.navigate("QRCodeScan")}><Text>Scan address from QR code</Text></Button>
        </Content>
      </Container>
    );
  }
}