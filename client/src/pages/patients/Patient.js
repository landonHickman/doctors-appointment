import React from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import List from '../../components/List'
import Spinner from '../../components/Spinner'
import useAxiosOnMount from '../../customHooks/useAxiosOnMount'

const Patient = () => {
  const {id} = useParams()
  const {data, loading, error} = useAxiosOnMount(`/api/patients/${id}`)
  if(loading) return <Spinner />
  if(error) return <ErrorMessage error={error}/>

  return(
    <div>
      <List 
        name={`Appointments for ${data.patient.name}`}
        data={data.appointment}
        renderData = {(a)=> {
          return (
            <div key={a.id} style={{marginBottom: '15px'}}>
              <h2>{a.doctor}</h2>
              <h4>{a.appDate}</h4>
           </div>
          )
        }}
      />
    </div>
  )
}

export default Patient