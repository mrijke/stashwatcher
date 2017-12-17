import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import createSagaMiddleware from "redux-saga";

import { coinReducer, ICoinState, rootSaga as coinRootSaga } from "./coins";
import {
  valutaReducer,
  IValutaState,
  rootSaga as valutaRootSaga,
} from "./valuta";
import { all, fork } from "redux-saga/effects";

export interface IRootState {
  coins: ICoinState;
  valuta: IValutaState;
}

// const rootReducer = combineReducers({
//     coins: coinReducer,
// });
const config = {
  key: "root",
  storage,
};

const reducer = persistCombineReducers(config, {
  coins: coinReducer,
  valuta: valutaReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  reducer,
  undefined,
  applyMiddleware(sagaMiddleware)
);

export const persistor = persistStore(store);

function* rootSaga() {
  yield all([fork(coinRootSaga), fork(valutaRootSaga)]);
}

sagaMiddleware.run(rootSaga);
