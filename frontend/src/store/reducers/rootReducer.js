import authReducer from './authReducer';
import commentReducer from './commentReducer';
import projectReducer from './projectReducer';
import issueReducer from './issueReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    comment: commentReducer,
    project: projectReducer,
    issue: issueReducer,
    user: userReducer,
})

export default rootReducer