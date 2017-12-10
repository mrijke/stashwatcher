import * as React from "react";
import { Content, Text, Button } from "native-base";
import { IEnhancedAddressInfo } from "../common/redux/coins";
import { Alert } from "react-native";

interface IAddressDetailsOwnProps {
  address: IEnhancedAddressInfo;
}

export class AddressDetails extends React.Component<IAddressDetailsOwnProps> {
  public render() {
    return (
      <Content>
        <Text>Details for some address: {this.props.address.description}</Text>
      </Content>
    )
  }
}