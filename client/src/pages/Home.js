import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return(
    <div style={{textAlign: 'center'}}>
      <h1>Check on Appointments</h1>
      <Link to='/patients'>Patient</Link>
      <Link to='/doctors'>Doctor</Link>
    </div>
  )
}

export default Home