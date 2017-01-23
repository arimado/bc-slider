import React from 'react'
import Supporter from 'js/components/supporter'
import Spinner from 'js/components/spinner'

class Pager extends React.Component {

  constructor(props) {
    super(props);

    // Initial API call
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
          { isFetching ? <Spinner /> : null }
          <div className="search">
            <input type="text" placeholder="Find a runner"></input>
          </div>
        </div>
        <div className="flex-row">
          <div className="arrow left flex-col" onClick={()=> { isAboveMin ? this.props.prevPage() : null }}>
            <div> ˂ </div>
          </div>
          <div className="supporters flex-row">
            { currentSupporters.map((s, i) => <Supporter key={i} index={i} data={s}/>) }
          </div>
          <div className="arrow right flex-col" onClick={()=>{ isBelowMax ? this.props.attemptNextPage(pagerState, queryState) : null }}>
            <div> ˃ </div>
          </div>
        </div>
      </div>
    )
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
