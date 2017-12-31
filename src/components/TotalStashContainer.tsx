import * as React from "react";
import { connect } from "react-redux";
import { Text, View } from "native-base";
import { get as emojiGet } from "node-emoji";

import { IRootState } from "../common/redux/index";
import { getTotalAmount } from "../common/redux/totals";

interface ITotalStashStateProps {
  totalAmount: number;
}

class TotalStash extends React.Component<ITotalStashStateProps> {
  public render() {
    return (
      <View padder>
        <Text style={{ fontWeight: "900" }}>
          {this.props.totalAmount.toLocaleString("nl-NL", {
            style: "currency",
            currency: "EUR",
          })}{" "}
          {emojiGet("moneybag")}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state: IRootState): ITotalStashStateProps => ({
  totalAmount: getTotalAmount(state),
});

export const TotalStashContainer = connect(mapStateToProps)(TotalStash);
