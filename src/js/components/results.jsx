import React from 'react'

const Results = ({ supporters, filteredSupporters, fetchHandler }) => (
  <div className="search-results">
    <ul>
      { filteredSupporters.map((supporter, i) => <li key={i}> { supporter.name } </li> ) }
    </ul>
    <p> { filteredSupporters.length } results of { supporters.length } supporters </p>
    <p> <button onClick={fetchHandler} > fetch more supporters </button> </p>
  </div>
)

export default Results
