import * as React from "react";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { IEnhancedAddressInfo } from "../common/redux/coins";

interface ICoinListItemProps {
  address: IEnhancedAddressInfo
}

export const CoinListItem = ({address}: ICoinListItemProps) => (
  <ListItem avatar>
    <Body>
      <Text>{address.description}</Text>
      <Text note>{address.address}</Text>
    </Body>
    <Right>
      <Text>{(address.balanceInfo && address.balanceInfo.balance / 100000000) || "N/A"} {address.type.toUpperCase()}</Text>
      <Text note>Another one</Text>
    </Right>
  </ListItem>
)