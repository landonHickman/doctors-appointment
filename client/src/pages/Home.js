import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return(
    <div style={{textAlign: 'center'}}>
      <h1>Home</h1>
      <Link to='/appointments'>View Appointments</Link>
    </div>
  )
}

export default Home