import React from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import List from '../../components/List'
import Spinner from '../../components/Spinner'
import useAxiosOnMount from '../../customHooks/useAxiosOnMount'

const Doctor = () => {
  const {id} = useParams()
  const {data, loading, error} = useAxiosOnMount(`/api/doctors/${id}`)
  if(loading) return <Spinner />
  if(error) return <ErrorMessage error={error}/>

  return(
    <div>
      <List 
        name={`Appointments for ${data.doctor}`}
        data={data.appointment}
        renderData = {(a)=> {
          return (
            <div key={a.id} style={{marginBottom: '15px'}}>
              <h2>{a.patient}</h2>
              <h4>{a.date}</h4>
           </div>
          )
        }}
      />
    </div>
  )
}

export default Doctor