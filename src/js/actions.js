const API = 'https://dev.bluechilli.com/grassrootz/api/campaigns/9/supporters'

export const parseJsonIfOkay = response => {
  if (response.ok) return response.json()
  else throw new Error("Response is not okay")
}

export const FETCH_DATA = 'FETCH_DATA'
export const fetchData = () => ({ type: FETCH_DATA })

export const FETCH_FINISH = 'FETCH_FINISH'
export const fetchFinish = () => ({ type: FETCH_FINISH })

export const NEXT_PAGE = 'NEXT_PAGE'
export const nextPage = () => ({ type: NEXT_PAGE })

export const PREV_PAGE = 'PREV_PAGE'
export const prevPage = () => ({ type: PREV_PAGE })

export const RECEIVE_SUPPORTERS = 'RECEIVE_SUPPORTERS'
export const recieveSupporters = (supporters) => ({
    type: RECEIVE_SUPPORTERS,
    data: supporters
})

export const attemptNextPage = (pagerState, queryState) => {
  if ( !pagerState || !queryState) {
    throw new Error('undefined parameters: ', pagerState, queryState)
    return
  }
  return dispatch => {
    dispatch(nextPage());
    if ( hasReachedLimit(pagerState) && hasFetchedOnce(queryState) ) {
      console.log('get supporters')
      dispatch(getSupporters(queryState.currentPage + 1, queryState.currentPageSize))
    }
  }
}

export const getSupporters = (pageNumber, pageSize) => {
  return dispatch => {
    dispatch(fetchData())
    return fetchSupporters(pageNumber, pageSize)
      .then(parseJsonIfOkay)
      .then(
        result => {
          dispatch(fetchFinish())
          dispatch(recieveSupporters(result))
        }
    )
  }
}

function fetchSupporters(pageNumber, pageSize) {
  const headers = new Headers()
  headers.append('apiKey', '41B11B5B-5F6D-4F18-9B8C-C7DCEF22F759')
  return fetch(`${API}?pageNumber=${pageNumber}&pageSize=${pageSize}`, { headers })
}

function hasFetchedOnce(queryState) {
  if ( queryState.pageCount !== null ) return true
  return false
}


function hasReachedLimit({supporters, page: pagerPage, pageSize, isFetching}) {
  const offset = ( pagerPage - 1 ) * pageSize
  const offsetLength = pageSize + offset
  const supportersLeft = supporters.slice(offsetLength, supporters.length).length
  // console.log('##### LIMIT CHECK ########')
  // console.log('offset: ', offset);
  // console.log('offsetLenfth: ', offsetLength)
  // console.log('supportersLeft: ', supportersLeft)
  // console.log('pageSize: ', pageSize)
  // console.log('###########################')
  if ( supportersLeft <= pageSize && !isFetching ) {
      console.log('only 4 left go fetch more');
      return true;
  }
  return false;
}
















/**
   * # getReleaseImage
   *
   * The goal of this function is to get an image
   *
   *
   */
