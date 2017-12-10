import actionCreatorFactory, {
  isType,
  Action as TSAction,
} from "typescript-fsa";
import { IAddressInfo, IFetchAddressPayload, CoinType, API } from "../api/ApiClient";
import { Action } from "redux";
import { call, put, takeLatest, all, fork, select, take, takeEvery } from "redux-saga/effects";
import _values from "lodash-es/values";
import _omit from "lodash-es/omit";

import { IRootState } from "./index";

const actionCreator = actionCreatorFactory("COINS");

export interface IEnhancedAddressInfo {
  type: CoinType;
  description: string;
  address: string;
  balanceInfo: IAddressInfo;
}

const FETCH_ADDRESS = "FETCH_ADDRESS";
const performFetchAddress = actionCreator<IFetchAddressPayload>(FETCH_ADDRESS);
const fetchAddress = actionCreator.async<IFetchAddressPayload, IEnhancedAddressInfo, {}>(FETCH_ADDRESS);
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

export const actions = {
  performFetchAddress,
  performRefreshAddresses,

  addAddress,
  deleteAddress,
  resetLoading,
}

export interface ICoinState {
  addresses: {
    [k: string]: IEnhancedAddressInfo;
  },
  loading: boolean;
}

const initialState: ICoinState = {
  addresses: {},
  loading: false,
}

export const coinReducer = (state = initialState, action: Action) => {
  if (isType(action, fetchAddress.started)) {
    return {
      ...state,
      loading: true,
    }
  }
  if (isType(action, resetLoading)) {
    return {
      ...state,
      loading: false,
    }
  }
  if (isType(action, fetchAddress.done)) {
    const newAddressBalance = action.payload.result;
    const { address } = newAddressBalance;
    const newAddress = {
      ...state.addresses[address],
      balanceInfo: newAddressBalance,
    }
    return {
      ...state,
      loading: false,
      addresses: {
        ...state.addresses,
        [newAddress.address]: newAddress, 
      }
    }
  }
  if (isType(action, addAddress)) {
    const newAddress = action.payload;
    return {
      ...state,
      addresses: {
        ...state.addresses,
        [newAddress.address]: {
          ...newAddress,
        }
      }
    }
  }
  if (isType(action, deleteAddress)) {
    return {
      ...state,
      addresses: _omit(state.addresses, action.payload),
    }
  }
  return state;
}

function* performFetchAddressWorker(action: IFetchAddressAction) {
  try {
    yield put(fetchAddress.started(action.payload));
    const result = yield call(API.balance, action.payload);
    yield put(fetchAddress.done({ params: action.payload, result }))
  } catch (error) {
    yield put(fetchAddress.failed({ params: action.payload, error }))
  }
};

function* performFetchAddressWatcher() {
  yield takeEvery(performFetchAddress, performFetchAddressWorker);
}

function* performRefreshAddresesWatcher() {
  while (true) {
    yield take(performRefreshAddresses);
    const addresses = yield select((state: IRootState) => state.coins.addresses);
    yield all(
      _values(addresses).map((address: IEnhancedAddressInfo) => call(performFetchAddressWorker, {
        payload: { type: address.type, address: address.address }
      }))
    )
  }
}

export function* rootSaga() {
  yield all([
    fork(performFetchAddressWatcher),
    fork(performRefreshAddresesWatcher),
  ])
}