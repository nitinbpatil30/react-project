import axios from 'axios';
import { updateProductData, updateCategoriesData } from '../utilities/actionCreators';
import { takeLatest, call, put } from 'redux-saga/effects';

/** function that returns an axios call */
function loginApi(authParams) {
  return axios.request({
    method: 'get',
    url: 'https://muigrocery.free.beeceptor.com/groceries',
    data: authParams
  });
}

/** saga worker that is responsible for the side effects */
function* loginEffectSaga(action) {
  try {
    // data is obtained after axios call is resolved
    let { data } = yield call(loginApi, action.payload);

    let itemsV = data.products;
    //localStorage.setItem('ProdData', JSON.stringify(itemsV));

    let categoryArr = [];
    let categoryArrDup = [];
    for (const [index, value1] of itemsV.entries()) {
        //get categories
        if(categoryArrDup.indexOf(value1.type) === -1){
            categoryArrDup.push(value1.type);
            categoryArr.push({key: categoryArrDup.length, text: value1.type, value: value1.type});
        }
    }

    // dispatch action to change redux state
    yield put(updateProductData(itemsV));
    yield put(updateCategoriesData(categoryArr));

    action.resolve(data);
  } catch (e) {
    // catch error on a bad axios call
    action.reject(e);
  }
}
/**
 * saga watcher that is triggered when dispatching action of type
 */
export function* productDataWatcherSaga() {
  yield takeLatest('GET_PRODUCT_DATA', loginEffectSaga);
}