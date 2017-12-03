import actionCreatorFactory, {
  isType,
  Action as TSAction,
} from "typescript-fsa";
import { IAddressInfo, IFetchAddressPayload, CoinType, API } from "../api/ApiClient";
import { Action } from "redux";
import { call, put, takeLatest, all, fork, select, take, takeEvery } from "redux-saga/effects";
import _values from "lodash-es/values";

import { IRootState } from "./index";

const actionCreator = actionCreatorFactory("COINS");

export interface IEnhancedAddressInfo extends IAddressInfo {
  type: CoinType;
}

const FETCH_ADDRESS = "FETCH_ADDRESS";
const performFetchAddress = actionCreator<IFetchAddressPayload>(FETCH_ADDRESS);
const fetchAddress = actionCreator.async<IFetchAddressPayload, IEnhancedAddressInfo, {}>(FETCH_ADDRESS);
type IFetchAddressAction = TSAction<IFetchAddressPayload>;

const REFRESH_ADDRESSES = "REFRESH_ADDRESSES";
const performRefreshAddresses = actionCreator(REFRESH_ADDRESSES);

export const actions = {
  performFetchAddress,
  performRefreshAddresses,
}

export interface ICoinState {
  addresses: {
    [k: string]: IEnhancedAddressInfo;
  }
}

const initialState: ICoinState = {
  addresses: {}
}

export const coinReducer = (state = initialState, action: Action) => {
  if (isType(action, fetchAddress.done)) {
    const newAddress = action.payload.result;
    return {
      ...state,
      addresses: {
        ...state.addresses,
        [newAddress.address]: newAddress,
      }
    }
  }
  return state;
}

function* performFetchAddressWorker(action: IFetchAddressAction) {
  console.log("Doing request for", action)
  try {
    yield put(fetchAddress.started(action.payload));
    const result = yield call(API.balance, action.payload);
    result.type = action.payload.type;
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