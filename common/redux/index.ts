import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createSagaMiddleware from "redux-saga";

import { coinReducer, ICoinState, rootSaga } from "./coins";

export interface IRootState {
    coins: ICoinState;
}

// const rootReducer = combineReducers({
//     coins: coinReducer,
// });
const config = {
    key: 'root',
    storage,
  }
  
const reducer = persistCombineReducers(config, { coins: coinReducer} )

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, undefined, applyMiddleware(sagaMiddleware));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
