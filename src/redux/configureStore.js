import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import countries from './countries/country';
import details from './details/details';
import search from './search/searchReducer';

const reducer = combineReducers({ countries, details, search });
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
