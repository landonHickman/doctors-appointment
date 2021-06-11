import React from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import List from '../../components/List'
import Spinner from '../../components/Spinner'
import useAxiosOnMount from '../../customHooks/useAxiosOnMount'

const Appointments = () => {
  const {data, loading, error} = useAxiosOnMount('/api/appointments')

  if(loading) return <Spinner />
  if(error) return <ErrorMessage error={error}/>

  return(
    <div>
      <List
        renderData={(app)=>{
          return(
            <div key={app.id} style={{padding: '10px'}}>
              <h4>Patient {app.patientName} has an appointment with {app.doctorName} on {app.date}.</h4>
            </div>
          )
        }}
        data={data}
        name='Appointments'
      />
    </div>
  )
}

export default Appointments