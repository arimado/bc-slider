import API from 'src/js/constants'

export const FETCH_DATA = 'FETCH_DATA'
export const fetchData = () => ({ type: FETCH_DATA })

export const FETCH_FINISH = 'FETCH_FINISH'
export const fetchFinish = () => ({ type: FETCH_FINISH })

export const NEXT_PAGE = 'NEXT_PAGE'
export const nextPage = () => ({ type: NEXT_PAGE })

export const PREV_PAGE = 'PREV_PAGE'
export const prevPage = () => ({ type: PREV_PAGE })

export const RECEIVE_SUPPORTERS = 'RECEIVE_SUPPORTERS'
export const recieveSupporters = (supporters) => ({ type: RECEIVE_SUPPORTERS,
    data: supporters
})


/**
   * # PREFETCH MECHANISM
   *
   * The goal of the prefetch mechanism is to prefetch data as the pager
   * approaches its limit in client memory so as to avoid spinning loaders
   * when paginating through. There are two main functions: attemptNextPage()
   * and getSupporters(), both of which, use the thunk-wrapped dispatches to
   * make async mutations to the store.
   *
   * attemptNextPage()
   *
   * This determines if the app should fetch more data based on where the
   * current pager is and the result total provided by the endpoint.
   *
   * getSupporters()
   *
   * This retreives the data and is wrapped in dispatchers that turn on/off
   * the isFetching flag in the pagerState reducer.
   *
   */

export const attemptNextPage = (pagerState, queryState) => {
  if ( !pagerState || !queryState) {
    throw new Error('undefined parameters: ', pagerState, queryState)
    return
  }
  return dispatch => {
    dispatch(nextPage())
    // Fetch from the API if there is still stuff to fetch
    if ( hasFetchedOnce(queryState) && hasReachedPreFetchLimit(pagerState) && !hasReachedQueryLimit(queryState) ) {
      dispatch(getSupporters(queryState.currentPage + 1, queryState.currentPageSize))
    }
  }
}


/**
  * # getSupporters
  * This uses the fetch API which in fetchSupporters() which returns a promise
  * with the result that includes an isOk flag
  */


export const getSupporters = (pageNumber, pageSize) => {
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
  * The functions below use function declartions to take advantage of hoisiting
  * so i can interchangebly use them without thinking about order of operation
  * dependencies
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
