import { all } from 'redux-saga/effects';
import { productDataWatcherSaga} from './productListSaga';

// import watchers from other files
export default function* rootSaga() {
  yield all([
    productDataWatcherSaga()
  ]);
}