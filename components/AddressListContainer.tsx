import * as React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View } from 'native-base';
import _values from "lodash-es/values";


import { IRootState } from "../common/redux/index";
import { IEnhancedAddressInfo, actions as coinActions, IAddAddressPayload } from "../common/redux/coins";
import { actions as valutaActions } from "../common/redux/valuta";
import { IFetchAddressPayload } from "../common/api/ApiClient";
import { AddressListItem } from "./AddressListItem";
import { RefreshControl } from "react-native";

interface IAddressListStateProps {
  addresses: IEnhancedAddressInfo[];
  loading: boolean;
}

interface IAddressListDispatchProps {
  performRefreshAddresses: () => void;
  performFetchValutaRates: () => void;

  resetLoading: () => void;
}

type AddressListProps = {} & IAddressListStateProps & IAddressListDispatchProps;

class AddressListInnerContainer extends React.Component<AddressListProps> {
  public componentDidMount() {
    this.props.resetLoading();
    this.props.performRefreshAddresses();
    this.props.performFetchValutaRates();
  }

  public componentWillReceiveProps(nextProps: AddressListProps) {
    if (nextProps.addresses.length !== this.props.addresses.length) {
      // if the number of addresses changes, refresh them
      this.props.performRefreshAddresses();
    }
  }

  private onRefresh = () => {
    this.props.performRefreshAddresses();
    this.props.performFetchValutaRates();
  }

  public render() {
    if (this.props.addresses.length === 0) {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            textAlign: 'center',
            color: '#333333',
          }}>No addresses added yet.</Text>
          <Text>Tap on the "+" icon to add one!</Text>
        </View>);
    }
    return (
      <List refreshControl={
        <RefreshControl
          refreshing={this.props.loading}
          onRefresh={this.onRefresh}
        />
      }
        dataArray={this.props.addresses}
        renderRow={(item) => <AddressListItem address={item} />}
      />
    )
  }
}

const mapStateToProps = (state: IRootState): IAddressListStateProps => ({
  addresses: _values(state.coins.addresses),
  loading: state.coins.loading,
});

const mapDispatchToProps: IAddressListDispatchProps = {
  performRefreshAddresses: coinActions.performRefreshAddresses,
  resetLoading: coinActions.resetLoading,
  performFetchValutaRates: valutaActions.performFetchValutaRates,
}

export const AddressListContainer = connect(mapStateToProps, mapDispatchToProps)(AddressListInnerContainer);
