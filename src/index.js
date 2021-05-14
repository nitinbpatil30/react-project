import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";

import App from "./app";
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';
import './index.css';

/***** Add middle ware between redux and componets *****/
const sagaMiddleware = createSagaMiddleware();
/***** create centralised cache *****/
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
/***** run middleware *****/
sagaMiddleware.run(rootSaga);

/***** Wrap redux provider to other components *****/
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
