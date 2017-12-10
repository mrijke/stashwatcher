import * as React from "react";
import { Container, Header, Body, Title, Right, Button, Icon, Content } from "native-base";
import { styles } from "../common/styles";
import { CoinListContainer } from "../components/CoinListContainer";


export class HomeScreen extends React.Component<any> {
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
        <Content contentContainerStyle={styles.container}>
          <CoinListContainer />
        </Content>
      </Container>
    )
  }
}