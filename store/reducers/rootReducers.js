import authReducers from "./authReducers";
import { combineReducers } from "redux";
import listReducers from "./listReducers";




const rootReducers = combineReducers({
    aut:authReducers,
    listing:listReducers,
})

export default rootReducers;