import { combineReducers } from 'redux';
import accessReducer from './reducers/AccessReducer';

const rootReducer = combineReducers({
  access: accessReducer
});

export default rootReducer;
