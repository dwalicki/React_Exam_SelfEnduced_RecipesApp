import { combineReducers } from 'redux';
import recipes from './recipes_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    recipes,
    user
});

export default rootReducer;