import React, { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import List from '../../components/List'
import Spinner from '../../components/Spinner'
import useAxiosOnMount from '../../customHooks/useAxiosOnMount'
import useAxios from 'axios-hooks'
import AppointmentForm from './AppointmentForm'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Appointments = () => {
  const {data, loading, error, setData} = useAxiosOnMount('/api/appointments')
  const [showAppForm, setShowAppForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const [
    { data: patientsData, loading:patientsLoading, error:patientsError},
    getPatientsData
  ] = useAxios(
    {
      url: "/api/patients",
      method: "get"
    },
    { manual: true }
  );

  const [
    { data: doctorsData, loading:doctorsLoading, error:doctorsError},
    getDoctorsData
  ] = useAxios(
    {
      url: "/api/doctors",
      method: "get"
    },
    { manual: true }
  );

  const formatPatientsData = () => {
    if(!patientsData) return []
    return patientsData.map (p => {
      return {key: p.id, text:p.name, value: p.id}
    })
  }
  
  const formatDoctorsData = () => {
    if(!doctorsData) return []
    return doctorsData.map (d => {
      return {key: d.id, text:d.name, value: d.id}
    })
  }

  const showAppUI = async () => {
    setShowAppForm(!showAppForm)
    getPatientsData()
    getDoctorsData()
  }

  const addApp = (app) => {
    setData([app, ...data])
  }

  const deleteApp = async(id) => {
    let res = await axios.delete(`/api/appointments/${id}`)
    setData(data.filter(a => a.id !== res.data.id))
  }

  if(loading) return <Spinner />
  if(error) return <ErrorMessage error={error}/>

  return(
    <div>
      <div onClick={showAppUI}>Add Appointment</div>
      {showAppForm && <AppointmentForm
        patientsData={formatPatientsData()}
        doctorsData={formatDoctorsData()}
        addApp={addApp}
      />}
      <List
        renderData={(app)=>{
          return(
            <div key={app.id} style={{padding: '10px'}}>
              <h4>ID: {app.id}. Patient {app.patientName} has an appointment with {app.doctorName} on {app.date}.</h4>
              <div onClick={()=>deleteApp(app.id)}>Delete</div>
              <Link to={`/appointments/${app.id}`}>Edit</Link>
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