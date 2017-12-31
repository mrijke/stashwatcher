import * as React from "react";
import {
  Container,
  Header,
  Body,
  Title,
  Right,
  Button,
  Icon,
  Content,
  Text,
  View,
} from "native-base";
import { styles } from "../common/styles";
import { AddressListContainer } from "../components/AddressListContainer";
import { TotalStashContainer } from "../components/TotalStashContainer";

export class HomeScreen extends React.Component<any> {
  static navigationOptions = {
    // tslint:disable-next-line:no-null-keyword
    header: null,
  };

  public render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>StashWatcher</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                name="add"
                onPress={() => this.props.navigation.navigate("AddAddress")}
              />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <TotalStashContainer />
          <View
            style={{
              borderBottomColor: "#ccc",
              borderBottomWidth: 3,
            }}
          />
          <AddressListContainer />
        </Content>
      </Container>
    );
  }
}
