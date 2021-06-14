// import useAxios from 'axios-hooks'
// import React, { useState } from 'react'
// import { useParams } from 'react-router'
// import useAxiosOnMount from '../../customHooks/useAxiosOnMount'
// import { BUTTON } from '../../styles/styles'
// import AppointmentForm from './AppointmentForm'

// const Appointment = (props) => {
//   const {data, setData} = useAxiosOnMount('/api/appointments')
//   const [showAppForm, setShowAppForm] = useState(false)
//   const {id} = useParams()

  
//   const [
//     { data: patientsData},
//     getPatientsData
//   ] = useAxios(
//     {
//       url: "/api/patients",
//       method: "get"
//     },
//     { manual: true }
//   );

//   const [
//     { data: doctorsData},
//     getDoctorsData
//   ] = useAxios(
//     {
//       url: "/api/doctors",
//       method: "get"
//     },
//     { manual: true }
//   );

//   const showAppUI = async () => {
//     setShowAppForm(!showAppForm)
//     getPatientsData()
//     getDoctorsData()
//   }

//   const formatPatientsData = () => {
//     if(!patientsData) return []
//     return patientsData.map (p => {
//       return {key: p.id, text:p.name, value: p.id}
//     })
//   }
  
//   const formatDoctorsData = () => {
//     if(!doctorsData) return []
//     return doctorsData.map (d => {
//       return {key: d.id, text:d.name, value: d.id}
//     })
//   }

//   const editApp = (app) => {
//     setData(data.map(a=> a.id === app.id ? app : a))
//   }
  
//   return(
//     <div>
//       <h1>Edit Appointment</h1>
//       <BUTTON onClick={showAppUI}>Edit</BUTTON>
//       {showAppForm && <AppointmentForm 
//       />}
//     </div>
//   )
// }
// export default Appointment