import React from 'react'
import Supporter from 'js/components/supporter'

class Pager extends React.Component {

  componentWillMount() {

    // /**
    //    * # Pre-fetch mechanism
    //    *
    //    * Pre-fetch more results as the pager approaches the limit in client storage.
    //    * - Only allow prefetch mechanism after app has fetched its first batch
    //    *   ( hence null check on query state 'pageCount')
    //    */
    //
    // console.log('componentWillMount ############')
    //
    // const { isFetching, supporters, pageSize, page: pagerPage } = this.props.state.pagerState
    // const { currentPage: currentQueryPage, currentPageSize: currentQueryPageSize, pageCount } = this.props.state.queryState
    //
    // const offset = ( pagerPage - 1 ) * pageSize
    // const offsetLength = pageSize + offset
    // const supportersLeft = supporters.slice(offset + offsetLength, supporters.length).length
    //
    // if ( supportersLeft <= pageSize && !isFetching && pageCount !== null ) {
    //     console.log('only 4 left go fetch more');
    //     getSupporters( currentQueryPage + 1, currentQueryPageSize );
    // }

  }

  constructor(props) {
    super(props);
    const { getSupporters } = props
    const { currentPage, currentPageSize } = props.state.queryState
    getSupporters( currentPage, currentPageSize );
  }

  render() {

    const { pagerState, queryState } = this.props.state
    const { isFetching, supporters, pageSize, page: pagerPage } = pagerState
    const { getSupporters } = this.props

    const offset = ( pagerPage - 1 ) * pageSize
    const offsetLength = pageSize + offset

    const currentSupporters = supporters.slice(offset, offsetLength)

    return(
      <div className="pager flex-col">
        <div className="flex-row header">
          <h1 className="flex"> Team Issac </h1>
          <input type="text" placeholder="nice"></input>
        </div>
        <div className="flex-row">
          <div className="arrow left" onClick={()=> {this.props.prevPage()}}>
            Prev
          </div>
          <div className="supporters flex-row">
            { currentSupporters.map((s, i) => <Supporter key={i} index={i} data={s}/>) }
          </div>
          <div className="arrow right" onClick={()=>{ this.props.attemptNextPage(pagerState, queryState) }}>
            Next
          </div>
        </div>
        <ul>
          {supporters.map((s, i) => <li key={i}> {i}: {s.name} </li>)}
        </ul>

      </div>
    )
  }
}

// -----------------------------------------------------------------------------
// REDUX CONTAINER -------------------------------------------------------------
// -----------------------------------------------------------------------------

import { connect } from 'react-redux';
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
