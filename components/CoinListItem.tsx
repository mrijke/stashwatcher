import * as React from "react";
import { StyleSheet } from "react-native";
import { withNavigation, InjectedProps } from "react-navigation";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

import { IEnhancedAddressInfo } from "../common/redux/coins";
import { IAddressInfo, CoinType } from "../common/api/ApiClient";
import { IValutaState } from "../common/redux/valuta";
import { IRootState } from "../common/redux/index";
import { connect } from "react-redux";

interface ICoinListItemProps {
  address: IEnhancedAddressInfo
}

interface ICoinListStateProps {
  valuta: IValutaState;
}

type CoinIconMapping = {
  [k in CoinType]: string;
}

const coinIconMapping: CoinIconMapping = {
  btc: "",
  ltc: "",
  doge: "",
  eth: "",
}

class CoinListItemComponent extends React.Component<ICoinListStateProps & ICoinListItemProps & InjectedProps> {

  private convertToEuro() {
    if (this.props.address.balanceInfo) {
      const { type, balanceInfo: { balance } } = this.props.address;
      const rate = this.props.valuta[type];
      if (rate) {
        return (balance / 100000000 * rate).toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
      }
    }
    return "N/A";
  }

  public render() {
    const { address, navigation } = this.props;
    return (
      <ListItem avatar onPress={() => navigation.navigate("AddressDetail", { address })}>
        <Left>
          <Text style={styles.coin}>{coinIconMapping[address.type]}</Text>
        </Left>
        <Body>
          <Text>{address.description}</Text>
          <Text note style={styles.addressText}>{address.address}</Text>
        </Body>
        <Right>
          <Text style={styles.amountText}>{this.convertToEuro()}</Text>
          <Text><Text style={styles.amountText}>{address.balanceInfo ? address.balanceInfo.balance / 100000000 : <Text note>N/A</Text>}</Text> <Text style={styles.valutaText}>{address.type.toUpperCase()}</Text></Text>
        </Right>
      </ListItem>
    );
  }
}

const mapStateToProps = (state: IRootState): ICoinListStateProps => ({
  valuta: state.valuta,
})

export const CoinListItem = withNavigation(connect(mapStateToProps)(CoinListItemComponent));

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