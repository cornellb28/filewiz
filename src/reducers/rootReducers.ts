import { combineReducers } from "redux";
import filesReducer from './filesReducer'

const rootReducers = combineReducers({
    files: filesReducer
});

export default rootReducers;
