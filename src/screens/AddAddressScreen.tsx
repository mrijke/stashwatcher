import * as React from "react";
import { Container, Header, Left, Body, Content, Button, Title, Icon } from "native-base";

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
          <AddAddressForm navigation={this.props.navigation}/>
        </Content>
      </Container>
    );
  }
}