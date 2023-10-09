import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import recipesReducer from './recipe';

const rootReducer = combineReducers({
    session: sessionReducer,
    recipes: recipesReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export default function configureStore (preloadedState) {
    return createStore(rootReducer, preloadedState, enhancer);
}

