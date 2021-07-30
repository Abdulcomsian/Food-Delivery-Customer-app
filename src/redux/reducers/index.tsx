import {combineReducers} from 'redux';
import APP from './appReducer';
import USER from './userReducer';
import ORDER from './orderReducer';
export default combineReducers({APP, USER, ORDER});
