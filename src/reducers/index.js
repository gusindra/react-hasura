import updateCart from './updatecart';
import authReducer from './auth';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    cart: updateCart,
    user: authReducer,
})

export default allReducers;