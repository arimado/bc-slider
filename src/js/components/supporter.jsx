import React from 'react'

const Supporter = ({ data: supporter}) => {
  return (
    <div className="supporter flex-col">
       <div className="profile-photo"></div>
       <h3> { supporter.name } </h3>
       <h4> Raised </h4>
       <h3> ${supporter.raisedAmount } </h3>
       <button type="button"> View </button>
    </div>)
}

export default Supporter
