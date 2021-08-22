import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import newsReducer from "./Reducer";

const rootReducer = combineReducers({
    news: newsReducer,
});

const configureStore = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
));

export default configureStore;