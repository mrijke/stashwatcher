import * as React from "react";
import { StyleSheet } from "react-native";
import { withNavigation, InjectedProps } from "react-navigation";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

import { IEnhancedAddressInfo } from "../common/redux/coins";
import { IAddressInfo, CoinType } from "../common/api/ApiClient";

interface ICoinListItemProps {
  address: IEnhancedAddressInfo
}

type CoinIconMapping = {
  [k in CoinType]: string;
}

const coinIconMapping: CoinIconMapping = {
  btc: "",
  ltc: "",
  doge: ""
}

const convertToEuro = (amount: number) => (amount / 100000000 * 12733).toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });

const CoinListItemComponent = ({ address, navigation }: ICoinListItemProps & InjectedProps) => (
  <ListItem avatar onPress={() => navigation.navigate("AddressDetail", { address })}>
    <Left>
      <Text style={styles.coin}>{coinIconMapping[address.type]}</Text>
    </Left>
    <Body>
      <Text>{address.description}</Text>
      <Text note style={styles.addressText}>{address.address}</Text>
    </Body>
    <Right>
      <Text><Text style={styles.amountText}>{address.balanceInfo ? address.balanceInfo.balance / 100000000 : <Text note>N/A</Text>}</Text> <Text style={styles.valutaText}>{address.type.toUpperCase()}</Text></Text>
      <Text style={styles.amountText}>{convertToEuro(address.balanceInfo.balance)}</Text>
    </Right>
  </ListItem>
)

export const CoinListItem = withNavigation(CoinListItemComponent);

const styles = StyleSheet.create({
  addressText: {
    fontSize: 10,
  },
  amountText: {
    fontWeight: "bold",
  },
  valutaText: {
    color: "#666"
  },
  coin: {
    fontFamily: "cryptocoins",
  }
})