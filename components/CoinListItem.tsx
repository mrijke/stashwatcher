import * as React from "react";
import { StyleSheet } from "react-native";
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

export const CoinListItem = ({ address }: ICoinListItemProps) => (
  <ListItem avatar onPress={() => console.log("Pressed on", address)}>
    <Left>
      <Text style={styles.coin}>{coinIconMapping[address.type]}</Text>
    </Left>
    <Body>
      <Text>{address.description}</Text>
      <Text note style={styles.addressText}>{address.address}</Text>
    </Body>
    <Right>
      <Text>{address.balanceInfo ? <Text>{address.balanceInfo.balance / 100000000}</Text> : <Text note>N/A</Text>} {address.type.toUpperCase()}</Text>
      <Text note>Another one</Text>
    </Right>
  </ListItem>
)

const styles = StyleSheet.create({
  addressText: {
    fontSize: 10,
  },
  coin: {
    fontFamily: "cryptocoins",
  }
})