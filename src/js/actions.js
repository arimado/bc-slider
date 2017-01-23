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


/**
   * # getReleaseImage
   *
   * The goal of this function is to get an image
   *
   *
   */
