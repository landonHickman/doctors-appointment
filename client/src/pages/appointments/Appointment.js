import useAxios from 'axios-hooks'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import useAxiosOnMount from '../../customHooks/useAxiosOnMount'
import AppointmentForm from './AppointmentForm'

const Appointment = (props) => {
  const {data, loading, error, setData} = useAxiosOnMount('/api/appointments')
  const [showAppForm, setShowAppForm] = useState(false)
  const {id} = useParams()

  
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

  const showAppUI = async () => {
    setShowAppForm(!showAppForm)
    getPatientsData()
    getDoctorsData()
  }

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

  const editApp = (app) => {
    setData(data.map(a=> a.id === app.id ? app : a))
  }
  
  return(
    <div>
      <h1>Edit Appointment</h1>
      <h2>id: {id}</h2>
      <div onClick={showAppUI}>Edit</div>
      {showAppForm && <AppointmentForm 
        id={id}
        patientsData={formatPatientsData()}
        doctorsData={formatDoctorsData()}
        editApp={editApp}
      />}
    </div>
  )
}
export default Appointment