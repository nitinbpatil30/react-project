import { combineReducers } from 'redux';
import prodListReducer from './prodListReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  rProdList: prodListReducer,
  rCart: cartReducer
})

export default rootReducer;