import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { coinReducer, ICoinState, rootSaga } from "./coins";

export interface IRootState {
    coins: ICoinState;
}

const rootReducer = combineReducers({
    coins: coinReducer,
})

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, undefined, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
