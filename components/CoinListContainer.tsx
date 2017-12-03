import * as React from "react";
import { connect } from "react-redux";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View } from 'native-base';
import _values from "lodash-es/values";


import { IRootState } from "../common/redux/index";
import { IEnhancedAddressInfo, actions, IAddAddressPayload } from "../common/redux/coins";
import { IFetchAddressPayload } from "../common/api/ApiClient";
import { CoinListItem } from "./CoinListItem";
import { RefreshControl } from "react-native";

interface ICoinListStateProps {
  addresses: IEnhancedAddressInfo[];
}

interface ICoinListDispatchProps {
  performFetchAddress: (payload: IFetchAddressPayload) => void;
  performRefreshAddresses: () => void;

  addAddress: (payload: IAddAddressPayload) => void;
}

type CoinListProps = {} & ICoinListStateProps & ICoinListDispatchProps;

class CoinListInnerContainer extends React.Component<CoinListProps> {
  public componentDidMount() {
    this.props.addAddress({ type: "btc", description: "Main derp", address: "1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD" });
    this.props.addAddress({ type: "btc", description: "Another one", address: "1MKqXyqntFxqQAUwdKmvp5CQ5CoqrnS8Xp" });
  }

  private onRefresh = () => {
    console.log("Refreshing!!!");
    this.props.performRefreshAddresses();
  }

  public render() {
    console.log(this.props.addresses)
    return (
      <List refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={this.onRefresh}
        />
      }
        dataArray={this.props.addresses}
        renderRow={(item) => <CoinListItem address={item} />}
      />
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
