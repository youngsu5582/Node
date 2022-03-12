import { combineReducers } from "redux";
import user from './user_reducer';

// import comment from './comment_reducer';

//combineReducers 를 사용하여 Reducer를 전부 다 root 하나로 combine
const rootReducer = combineReducers({
    user
    // comment
})
export default rootReducer;