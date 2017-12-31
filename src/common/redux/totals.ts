import { IRootState } from "./index";
import { IEnhancedAddressInfo, selectors } from "./coins";

import _reduce from "lodash-es/reduce";
import { IValutaState } from "./valuta";

export const getEuroAmountForAddress = (
  valutaState: IValutaState,
  address: IEnhancedAddressInfo
) => {
  if (address.balanceInfo) {
    const rate = valutaState[address.type];
    if (rate) {
      return selectors.getBalanceForAddress(address) * rate;
    }
  }
  return 0;
};

export const getTotalAmount = (state: IRootState) => {
  return _reduce<IEnhancedAddressInfo, number>(
    state.coins.addresses,
    (sum, address) => {
      return sum + getEuroAmountForAddress(state.valuta, address);
    },
    0
  );
};
