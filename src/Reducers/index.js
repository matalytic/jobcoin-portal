import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import dashboard from './dashboard-reducers';

const rootReducer = combineReducers({dashboard, form});
export default rootReducer;
