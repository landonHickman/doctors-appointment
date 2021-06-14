import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import List from '../../components/List'
import Spinner from '../../components/Spinner'
import useAxiosOnMount from '../../customHooks/useAxiosOnMount'
import PatientForm from './PatientForm'

const Patient = () => {
  const {id} = useParams()
  const {data, loading, error, setData} = useAxiosOnMount(`/api/patients/${id}`)
  const [doctors, setDoctors] = useState([])

  useEffect(()=>{
    getDoctors()
  }, [])

  
    const getDoctors = async () => {
      let res = await axios.get(`/api/doctors`)
      setDoctors(res.data)
    }

    const formatDoctorsData = () => {
      if (!doctors) return []
      return doctors.map(d =>{
          return {key:d.id, text:d.name, value:d.id}
      })
    }

    const addApp = (app) => {
      console.log(app)
      console.log('data',data)
      setData([...data, app])
    }
    
    if(loading) return <Spinner />
    if(error) return <ErrorMessage error={error}/>
    return(
    <div>
      <div>
        <PatientForm
          addApp={addApp}
          patientId={id} 
          patientName={data.patient} 
          doctors={doctors} 
          doctorsData={formatDoctorsData()}
        />
      </div>
      <List 
        name={`Appointments for ${data.patient}`}
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