import React from 'react'

// I use webpacks absolute paths so I can avoid the nasty '../../../' business

import Supporter from 'js/components/supporter'
import Spinner from 'js/components/spinner'
import Search from 'js/components/search'

/***
   * Class
   *
   * This is the main component and is the only one utilising a react class.
   * This is the only instance of a react class because I wanted to use the
   * lifecylcle method to fetch initial data.
   *
   */

class Pager extends React.Component {

  constructor(props) {
    super(props);
    const { getSupporters } = props
    const { currentPage, currentPageSize } = props.state.queryState
    getSupporters( currentPage, currentPageSize );
  }

  render() {

    const { pagerState, queryState } = this.props.state
    const { isFetching, supporters, pageSize, page: pagerPage } = pagerState
    const { totalCount } = queryState
    const { getSupporters } = this.props

    const offset = ( pagerPage - 1 ) * pageSize
    const offsetLength = pageSize + offset

    const currentSupporters = supporters.slice(offset, offsetLength)

    const isAboveMin = pagerPage > 1
    const isBelowMax = offsetLength <= totalCount

    return(
      <div className="pager">
        <div className="flex-row header">
          <h1 className="flex"> Team Issac </h1>
          <Spinner isFetching={isFetching}/>
          <Search />
        </div>
        <div className="flex-row">
          <div className="arrow left flex-col" onClick={this._prevPageHandler(isAboveMin)}>
            <div> ˂ </div>
          </div>
          <div className="supporters flex-row">
            { currentSupporters.map((s, i) => <Supporter key={i} index={i} data={s}/>) }
          </div>
          <div className="arrow right flex-col" onClick={this._nextPageHandler(isBelowMax, pagerState, queryState)}>
            <div> ˃ </div>
          </div>
        </div>
      </div>
    )
  }

  /**
    * # Methods in closures
    *
    * The below methods are in closures for two reasons:
    * 1. I can pass down parameters
    * 2. I have access to the components 'this' keyword without binding in the
    *    constructor
    *
    * Prefixed with underscore to differentiate from React API
    */


  _prevPageHandler(isAboveMin) {
    return event => {
      if ( isAboveMin ) {
        this.props.prevPage()
        return
      }
    }
  }

  _nextPageHandler(isBelowMax, pagerState, queryState) {
    return event => {
      if ( isBelowMax ) {
        this.props.attemptNextPage(pagerState, queryState)
      }
    }
  }

}

// -----------------------------------------------------------------------------
// REDUX CONTAINER -------------------------------------------------------------
// -----------------------------------------------------------------------------

import { connect } from 'react-redux'
import { getSupporters, attemptNextPage, prevPage } from 'js/actions'

var mapStateToProps = state => ({ state })
var mapDispatchToProps = (dispatch) => ({
    getSupporters: (pageNumber, pageSize) => dispatch(getSupporters(pageNumber, pageSize)),
    attemptNextPage: (pagerState, queryState) => dispatch(attemptNextPage(pagerState, queryState)),
    prevPage: () => dispatch(prevPage())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pager)
