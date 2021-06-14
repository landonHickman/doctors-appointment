import React from 'react'
import { useHistory } from 'react-router'

const Redirect = () => {
  const history = useHistory()
  history.push('/appointments')
  return(
    <h1>Redirecting</h1>
  )
}

export default Redirect