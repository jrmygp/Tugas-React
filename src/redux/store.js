// tambahin reducer" funky lu disini

import { combineReducers } from "redux"
import userReducer from "./reducers/user"
import counterReducer from "./reducers/counter"

const rootReducer = combineReducers({
    user: userReducer,
    counter: counterReducer,
})

export default rootReducer