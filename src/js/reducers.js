import { combineReducers } from 'redux';

import {
  FETCH_DATA,
  FETCH_FINISH,
  GET_SUPPORTERS,
  RECEIVE_SUPPORTERS,
  NEXT_PAGE,
  PREV_PAGE
} from 'js/actions'

const initialPagerState = {
  isFetching: false,
  supporters: [],
  page: 1,
  pageSize: 4
}

const pagerStateReducer = ( state = initialPagerState, action ) => {
  switch (action.type) {
    case FETCH_DATA:
      return Object.assign({}, state, { isFetching: true })
      break
    case FETCH_FINISH:
      return Object.assign({}, state, { isFetching: false })
      break
    case RECEIVE_SUPPORTERS:
      const { data } = action.data
      return Object.assign({}, state, { supporters: [...state.supporters, ...data] })
      break
    case NEXT_PAGE:
      return Object.assign({}, state, { page: state.page + 1 })
      break
    case PREV_PAGE:
      return Object.assign({}, state, { page: state.page - 1 })
      break
    default:
      return state
  }
}

const initialQueryState = {
  currentPage: 1,
  currentPageSize: 12,
  pageSize: null,
  pageCount: null,
  pageSize: null
}

const queryStateReducer = ( state = initialQueryState, action ) => {
  switch (action.type) {
    case RECEIVE_SUPPORTERS:
      const { currentPage, currentPageSize,
              pageCount, pageSize,
              totalCount } = action.data
      return Object.assign({}, state, { currentPage, currentPageSize, pageCount, pageSize, totalCount })
      break
    default:
      return state
  }
}

const rootReducer = combineReducers({
  queryState: queryStateReducer,
  pagerState: pagerStateReducer })

export default rootReducer
