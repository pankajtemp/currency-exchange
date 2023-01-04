import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ratesReducer from "./rates-reducer";
import cardsReducer from "./cards-reducer";
import httpReducer from "./http-reducer";

const reducers = combineReducers({
  rateData: ratesReducer,
  cardData: cardsReducer,
  httpData: httpReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
