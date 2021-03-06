import * as React from "react";
import { StyleSheet } from "react-native";
import { withNavigation, InjectedProps } from "react-navigation";
import { ListItem, Left, Body, Right, Text } from "native-base";

import { IEnhancedAddressInfo, selectors } from "../common/redux/coins";
import { CoinType } from "../common/api/ApiClient";
import { IValutaState } from "../common/redux/valuta";
import { IRootState } from "../common/redux/index";
import { connect } from "react-redux";
import { getEuroAmountForAddress } from "../common/redux/totals";

const styles = StyleSheet.create({
  addressText: {
    fontSize: 10,
  },
  amountText: {
    fontWeight: "bold",
  },
  valutaText: {
    color: "#666",
  },
  coin: {
    fontFamily: "cryptocoins",
  },
});

interface IAddressListItemProps {
  address: IEnhancedAddressInfo;
}

interface IAddressListStateProps {
  valuta: IValutaState;
}

type CoinIconMapping = { [k in CoinType]: string };

const coinIconMapping: CoinIconMapping = {
  btc: "",
  ltc: "",
  doge: "",
  eth: "",
};

class AddressListItemComponent extends React.Component<
  IAddressListStateProps & IAddressListItemProps & InjectedProps
> {
  private convertToEuro() {
    const amount = getEuroAmountForAddress(
      this.props.valuta,
      this.props.address
    );
    return amount
      ? amount.toLocaleString("nl-NL", {
          style: "currency",
          currency: "EUR",
        })
      : "N/A";
  }

  public render() {
    const { address, navigation } = this.props;
    return (
      <ListItem
        avatar
        onPress={() => navigation.navigate("AddressDetail", { address })}
      >
        <Left>
          <Text style={styles.coin}>{coinIconMapping[address.type]}</Text>
        </Left>
        <Body>
          <Text>{address.description}</Text>
          <Text note style={styles.addressText}>
            {address.address}
          </Text>
        </Body>
        <Right>
          <Text style={styles.amountText}>{this.convertToEuro()}</Text>
          <Text>
            <Text style={styles.amountText}>
              {address.balanceInfo ? (
                selectors.getBalanceForAddress(address)
              ) : (
                <Text note>N/A</Text>
              )}
            </Text>{" "}
            <Text style={styles.valutaText}>{address.type.toUpperCase()}</Text>
          </Text>
        </Right>
      </ListItem>
    );
  }
}

const mapStateToProps = (state: IRootState): IAddressListStateProps => ({
  valuta: state.valuta,
});

export const AddressListItem = withNavigation<IAddressListItemProps>(
  connect(mapStateToProps)(AddressListItemComponent)
);
