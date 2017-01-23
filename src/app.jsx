import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'

require('css/style.css')
import Pager from 'js/components/pager'
import rootReducer from 'js/reducers'

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

ReactDOM.render(
  <Provider store={store}>
    <Pager/>
  </Provider>
, document.getElementById('app'));
