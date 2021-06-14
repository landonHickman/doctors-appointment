import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'
import {useParams, useLocation, useHistory} from 'react-router-dom'

const AppointmentForm = (props) => {
  const location = useLocation()
  const params = useParams()
  const history = useHistory()
  const [date, setDate] = useState(location.date ? location.date : '')
  const [patientID, setPatientID] = useState(location.patient_id ? location.patient_id : '')
  const [patients, setPatients] = useState([])
  const [doctorID, setDoctorID] = useState(location.doctor_id ? location.doctor_id : '')
  const [doctors, setDoctors] = useState([])

  useEffect(()=>{
    getApps()
  },[])

  const getApps = async () => {
    let res = await axios.get(`/api/doctors`)
    let res2 = await axios.get(`/api/patients`)
    let selectDocData = res.data.map(doc=> {
      return {key: doc.id, value: doc.id, text: doc.name}
    })
    let selectPatientData = res2.data.map(pat=> {
      return {key: pat.id, value: pat.id, text: pat.name}
    })
    setDoctors(selectDocData)
    setPatients(selectPatientData)
  }
  const handleSubmit = async () => {
    try{
      if(params.id){
        await axios.put(`/api/appointments/${params.id}`, 
        {date: date, patient_id: patientID, doctor_id: doctorID}
        )
      }else {
        await axios.post(`/api/appointments`, 
        {date: date, patient_id: patientID, doctor_id: doctorID}
        )
      }
    } catch(err) {
      console.log('err',err)
    }
    history.push('/redirect')
  }

  return(
    <div>
      {params.id ? <h1>Edit Appointment</h1> : null}
      <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        fluid 
                        label='Date'
                        placeholder='Date'
                    />
                    <Form.Select
                        value={patientID}
                        onChange={(e, {value})=>setPatientID(value)}
                        fluid
                        label='Patient'
                        options={patients}
                        placeholder='Patient'
                    />
                    <Form.Select
                        value={doctorID}
                        onChange={(e, {value})=>setDoctorID(value)}
                        fluid
                        label='Doctor'
                        options={doctors}
                        placeholder='Doctor'
                    />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
    </div>
  )
}

export default AppointmentForm