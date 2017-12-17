import * as React from "react";
import { Content, Text } from "native-base";
import { IEnhancedAddressInfo } from "../common/redux/coins";

interface IAddressDetailsOwnProps {
  address: IEnhancedAddressInfo;
}

export class AddressDetails extends React.Component<IAddressDetailsOwnProps> {
  public render() {
    return (
      <Content>
        <Text>Details for some address: {this.props.address.description}</Text>
      </Content>
    );
  }
}
