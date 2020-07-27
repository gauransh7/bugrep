import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const initialState = {};

export const history = createBrowserHistory()

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;