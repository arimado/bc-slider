import { API } from 'js/constants'

const FETCH_DATA = 'FETCH_DATA'
const fetchData = () => ({ type: FETCH_DATA })

const FETCH_FINISH = 'FETCH_FINISH'
const fetchFinish = () => ({ type: FETCH_FINISH })

const NEXT_PAGE = 'NEXT_PAGE'
const nextPage = () => ({ type: NEXT_PAGE })

const PREV_PAGE = 'PREV_PAGE'
const prevPage = () => ({ type: PREV_PAGE })

const UPDATE_SEARCH = 'UPDATE_SEARCH'
const updateSearch = (value) => ({ type: UPDATE_SEARCH,
  data: value
})

const RECEIVE_SUPPORTERS = 'RECEIVE_SUPPORTERS'
const recieveSupporters = (supporters) => ({ type: RECEIVE_SUPPORTERS,
    data: supporters
})

/**
   * # PREFETCH MECHANISM
   *
   * The goal of the prefetch mechanism is to prefetch data as the pager
   * approaches its limit in client memory so as to avoid spinning loaders
   * when paginating through. All functions involved with the fetching of
   * data use thunk wrapped dispatches for async api calls.
   *
   */

function attemptNextPage(pagerState, queryState) {
  if ( !pagerState || !queryState) {
    throw new Error('undefined parameters: ', pagerState, queryState)
    return
  }
  return dispatch => {
    dispatch(nextPage())
    attemptNextFetch(pagerState, queryState)(dispatch)
  }
}

function attemptNextFetch(pagerState, queryState) {
  return dispatch => {
    if ( hasFetchedOnce(queryState) && hasReachedPreFetchLimit(pagerState)  ) {
      forceFetch(pagerState, queryState)(dispatch)
    }
  }
}

function forceFetch(pagerState, queryState) {
  return dispatch => {
    if ( hasReachedQueryLimit(queryState) ) {
      console.log('dispatch limit')
    } else {
      dispatch(getSupporters(queryState.currentPage + 1, queryState.currentPageSize))
    }
  }
}

function getSupporters(pageNumber, pageSize) {
  return dispatch => {
    dispatch(fetchData())
    return fetchSupporters(pageNumber, pageSize)
      .then(parseJsonIfOkay)
      .then(result => {
          dispatch(fetchFinish())
          dispatch(recieveSupporters(result))
        }
    )
  }
}

/**
  * # UTIL
  *
  *
  * fetchSupporters() uses the new Web API 'fetch' a native http library
  * parseJsonIfOkay() parses the returned response from the fetch API
  *
  */

function fetchSupporters(pageNumber, pageSize) {
  const headers = new Headers()
  headers.append('apiKey', '41B11B5B-5F6D-4F18-9B8C-C7DCEF22F759')
  return fetch(`${API}?pageNumber=${pageNumber}&pageSize=${pageSize}`, { headers })
}

function parseJsonIfOkay(response) {
  if (response.ok) return response.json()
  else throw new Error("Response is not okay")
}

function hasFetchedOnce(queryState) {
  if ( queryState.pageCount !== null ) return true
  return false
}

function hasReachedQueryLimit({ pageCount, currentPage }) {
  if ( currentPage === pageCount ) {
    return true
  }
  return false
}

function hasReachedPreFetchLimit({supporters, page: pagerPage, pageSize, isFetching}) {
  const offset = ( pagerPage - 1 ) * pageSize
  const offsetLength = pageSize + offset
  const supportersLeft = supporters.slice(offsetLength, supporters.length).length
  if ( supportersLeft <= pageSize && !isFetching ) {
      return true;
  }
  return false;
}


export {
  FETCH_DATA,         fetchData,
  FETCH_FINISH,       fetchFinish,
  NEXT_PAGE,          nextPage,
  PREV_PAGE,          prevPage,
  UPDATE_SEARCH,      updateSearch,
  RECEIVE_SUPPORTERS, recieveSupporters,

  attemptNextPage,
  attemptNextFetch,
  forceFetch,
  getSupporters,
}
