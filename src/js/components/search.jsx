import React from 'react'
import Results from 'js/components/results'

export const Search = ({ updateSearch, forceFetch, state }) => {

  const { pagerState, queryState } = state
  const { searchValue, supporters } = pagerState

  const searchFormChange = e => updateSearch(e.target.value)
  const filterSupportersWith = createTextFilterFor(supporters)
  // A closure is used to bind pager and query state to the forceFetch call.
  const fetchHandler = (pagerState, queryState) => () => forceFetch(pagerState, queryState)
  const isSearching = searchValue.length > 0;

  return (
    <div className="search">
      <input type="text" placeholder="Find a supporter" onChange={searchFormChange}></input>
      { isSearching ? <Results
        supporters={supporters}
        filteredSupporters={filterSupportersWith(searchValue)}
        fetchHandler={fetchHandler(pagerState, queryState)}/> : null}
    </div>
  )

}

// resusable method

function createTextFilterFor(items) {
  return searchValue => items.filter(textSearchFilter(searchValue))
}

// this search function was modified from work

function textSearchFilter(searchValue = "") {
  return supporter => {
      const name = supporter.name.length > 0 ? supporter.name : ""
      const safeSearchValue = searchValue.replace(/[^\w\s]/gi, '')
      const match = name.search(new RegExp(searchValue, 'i'))
      if ( match > -1 ) return true
      return false
  }
}

// -----------------------------------------------------------------------------
// REDUX CONTAINER -------------------------------------------------------------
// -----------------------------------------------------------------------------

import { connect } from 'react-redux'
import { updateSearch, forceFetch } from 'js/actions'

var mapStateToProps = state => ({ state })
var mapDispatchToProps = (dispatch) => ({
    updateSearch: value => dispatch(updateSearch(value)),
    forceFetch: (pagerState, queryState) => dispatch(forceFetch(pagerState, queryState))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
