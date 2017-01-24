import React from 'react'
import spinner from '../../assets/spin.svg'

export const Spinner = ({ isFetching }) => (
<div className="spinner flex-col">
   { isFetching ? <img src={spinner} /> : null }
</div>)


export default Spinner
