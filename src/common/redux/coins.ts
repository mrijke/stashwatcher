import actionCreatorFactory, {
  isType,
  Action as TSAction,
} from "typescript-fsa";
import {
  IAddressInfo,
  IFetchAddressPayload,
  CoinType,
  API,
} from "../api/ApiClient";
import { Action } from "redux";
import {
  call,
  put,
  all,
  fork,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import _values from "lodash-es/values";
import _omit from "lodash-es/omit";

import { IRootState } from "./index";

const actionCreator = actionCreatorFactory("COINS");

export interface IEnhancedAddressInfo {
  type: CoinType;
  address: string;
  description?: string;
  balanceInfo?: IAddressInfo;
}

const FETCH_ADDRESS = "FETCH_ADDRESS";
const performFetchAddress = actionCreator<IFetchAddressPayload>(FETCH_ADDRESS);
const fetchAddress = actionCreator.async<
  IFetchAddressPayload,
  IAddressInfo,
  {}
>(FETCH_ADDRESS);
type IFetchAddressAction = TSAction<IFetchAddressPayload>;

export interface IAddAddressPayload {
  type: CoinType;
  address: string;
  description?: string;
}
const ADD_ADDRESS = "ADD_ADDRESS";
const addAddress = actionCreator<IAddAddressPayload>(ADD_ADDRESS);

const DELETE_ADDRESS = "DELETE_ADDRESS";
const deleteAddress = actionCreator<string>(DELETE_ADDRESS);

const REFRESH_ADDRESSES = "REFRESH_ADDRESSES";
const performRefreshAddresses = actionCreator(REFRESH_ADDRESSES);

const RESET_LOADING = "RESET_LOADING";
const resetLoading = actionCreator(RESET_LOADING);

const ADDRESS_SCANNED = "ADDRESS_SCANNED";
const addressScanned = actionCreator<string>(ADDRESS_SCANNED);

const RESET_ADDRESS_SCANNED = "RESET_ADDRESS_SCANNED";
const resetAddressScanned = actionCreator(RESET_ADDRESS_SCANNED);

export const actions = {
  performFetchAddress,
  performRefreshAddresses,

  addAddress,
  deleteAddress,
  resetLoading,
  addressScanned,
  resetAddressScanned,
};

export interface ICoinState {
  addresses: {
    [k: string]: IEnhancedAddressInfo;
  };
  loading: boolean;
  scannedAddress: string;
}

const initialState: ICoinState = {
  addresses: {},
  loading: false,
  scannedAddress: "",
};

export const coinReducer = (
  state = initialState,
  action: Action
): ICoinState => {
  if (isType(action, fetchAddress.started)) {
    return {
      ...state,
      loading: true,
    };
  }
  if (isType(action, resetLoading)) {
    return {
      ...state,
      loading: false,
    };
  }
  if (isType(action, fetchAddress.done)) {
    const newAddressBalance = action.payload.result;
    const { address } = newAddressBalance;
    const newAddress: IEnhancedAddressInfo = {
      ...state.addresses[address],
      balanceInfo: newAddressBalance,
    };
    return {
      ...state,
      loading: false,
      addresses: {
        ...state.addresses,
        [newAddress.address]: newAddress,
      },
    };
  }
  if (isType(action, addAddress)) {
    const newAddress = action.payload;
    return {
      ...state,
      addresses: {
        ...state.addresses,
        [newAddress.address]: {
          ...newAddress,
        },
      },
    };
  }
  if (isType(action, deleteAddress)) {
    return {
      ...state,
      addresses: _omit(state.addresses, action.payload),
    };
  }
  if (isType(action, addressScanned)) {
    return {
      ...state,
      scannedAddress: action.payload,
    };
  }
  if (isType(action, resetAddressScanned)) {
    return {
      ...state,
      scannedAddress: "",
    };
  }
  return state;
};

function* performFetchAddressWorker(action: IFetchAddressAction) {
  try {
    yield put(fetchAddress.started(action.payload));
    const result = yield call(API.balance, action.payload);
    yield put(fetchAddress.done({ params: action.payload, result }));
  } catch (error) {
    yield put(fetchAddress.failed({ params: action.payload, error }));
  }
}

function* performFetchAddressWatcher() {
  yield takeEvery(performFetchAddress, performFetchAddressWorker);
}

function* performRefreshAddresesWatcher() {
  while (true) {
    yield take(performRefreshAddresses);
    const addresses = yield select(
      (state: IRootState) => state.coins.addresses
    );
    yield all(
      _values(addresses).map((address: IEnhancedAddressInfo) =>
        call(
          performFetchAddressWorker,
          performFetchAddress({ type: address.type, address: address.address })
        )
      )
    );
  }
}

export function* rootSaga() {
  yield all([
    fork(performFetchAddressWatcher),
    fork(performRefreshAddresesWatcher),
  ]);
}
