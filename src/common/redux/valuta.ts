import { CoinType, API } from "../api/ApiClient";
import { actionCreatorFactory, isType } from "typescript-fsa";
import { Action } from "redux";
import { takeEvery, all, call, put, fork } from "redux-saga/effects";

export type IValutaState = { [k in CoinType]?: number };

const initialState: IValutaState = {
  btc: 0,
  ltc: 0,
  eth: 0,
  doge: 0,
};

const actionCreator = actionCreatorFactory("VALUTA");

const FETCH_VALUTA_RATE = "FETCH_VALUTA_RATE";
const performFetchValutaRates = actionCreator(FETCH_VALUTA_RATE);
const fetchValutaRates = actionCreator.async<{}, IValutaState, {}>(
  FETCH_VALUTA_RATE
);

export const actions = {
  performFetchValutaRates,
};

export const valutaReducer = (
  state = initialState,
  action: Action
): IValutaState => {
  if (isType(action, fetchValutaRates.done)) {
    const result = action.payload.result;
    return {
      ...state,
      ...result,
    };
  }
  return state;
};

function* performFetchValutaRatesWorker() {
  try {
    yield put(fetchValutaRates.started({}));
    const [btc, ltc, eth] = yield all([
      call(API.valuta, "btc"),
      call(API.valuta, "ltc"),
      call(API.valuta, "eth"),
    ]);
    yield put(
      fetchValutaRates.done({
        params: {},
        result: {
          btc,
          ltc,
          eth,
        },
      })
    );
  } catch (error) {
    yield put(fetchValutaRates.failed({ params: {}, error }));
  }
}

function* performFetchValutaRatesWatcher() {
  yield takeEvery(performFetchValutaRates, performFetchValutaRatesWorker);
}

export function* rootSaga() {
  yield all([fork(performFetchValutaRatesWatcher)]);
}
