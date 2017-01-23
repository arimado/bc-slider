import React from 'react'
import Supporter from 'js/components/supporter'

class Pager extends React.Component {
  componentDidMount() {
    const { getSupporters } = this.props
    const { currentPage, currentPageSize } = this.props.state.queryState
    getSupporters( currentPage, currentPageSize );
  }
  render() {
    const { supporters, pagerSize, page: pagerPage } = this.props.state.pagerState

    const offset = ( pagerPage - 1 ) * pagerSize
    const offsetLength = pagerSize + offset
    const currentSupporters = supporters.slice(offset, offsetLength)
    const supportersLeft = supporters.slice(offset, supporters.length).length

    // if ( supportersLeft <= pagerSize ) {
    //   console.log('fetching more people')
    //   getSupporters(pagerPage, pagerSize);
    // }

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
            { currentSupporters.map((s, i) => <Supporter key={i} data={s}/>) }
          </div>
          <div className="arrow right" onClick={()=>{ this.props.nextPage() }}>
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
import { getSupporters, nextPage, prevPage } from 'js/actions'

var mapStateToProps = state => ({ state })
var mapDispatchToProps = (dispatch) => ({
    getSupporters: (pageNumber, pageSize) => dispatch(getSupporters(pageNumber, pageSize)),
    nextPage: () => dispatch(nextPage()),
    prevPage: () => dispatch(prevPage())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pager)
