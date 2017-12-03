import * as React from "react";
import { connect } from "react-redux";
import _values from "lodash-es/values";

import { Text, View, Button } from "react-native";


import { IRootState } from "../common/redux/index";
import { IEnhancedAddressInfo, actions } from "../common/redux/coins";
import { IFetchAddressPayload } from "../common/api/ApiClient";

interface ICoinListStateProps {
  addresses: IEnhancedAddressInfo[];
}

interface ICoinListDispatchProps {
  performFetchAddress: (payload: IFetchAddressPayload) => void;
  performRefreshAddresses: () => void;
}

type CoinListProps = {} & ICoinListStateProps & ICoinListDispatchProps;

class CoinListInnerContainer extends React.Component<CoinListProps> {
  public componentDidMount() {
    this.props.performFetchAddress({ type: "btc", address: "1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD" })
    this.props.performFetchAddress({ type: "btc", address: "1ZBzVm8PQEVVtKQsr1bi3J1trysnzpiy7" })    
  }
  public render() {
    console.log(this.props.addresses)
    return (
      <View>
        <Button title="Refresh" onPress={this.props.performRefreshAddresses} />
        <Text>I've got {this.props.addresses.length} addresses!</Text>
        {this.props.addresses.map(address => <Text key={address.address}>{address.final_balance}</Text>)}
      </View>
    )
  }
}

const mapStateToProps = (state: IRootState): ICoinListStateProps => ({
  addresses: _values(state.coins.addresses),
});

const mapDispatchToProps: ICoinListDispatchProps = {
  ...actions
}

export const CoinListContainer = connect(mapStateToProps, mapDispatchToProps)(CoinListInnerContainer);
