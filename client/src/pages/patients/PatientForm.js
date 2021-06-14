import axios from 'axios'
import React, { useState } from 'react'
import { Form, Select } from 'semantic-ui-react'

const PatientForm = (props) => {
  const {patientId, doctorsData} = props
  const [date, setDate] = useState('')
  const [doctorId, setDoctorId] = useState('')

  const handleSubmit= async (e) => {
    e.preventDefault()

    try {
      let res = await axios.post(`/api/appointments`, {date: date, patient_id: patientId, doctor_id: doctorId})
      //res is passing the new id for appointments and the date only
      console.log('res',res)
      
      // console.log('res.data',res.data)
      // addApp(res.data)
    } catch(err){
      console.log(err)
    }
  }

  const doctorChanged = (e, {value}) => {
    setDoctorId(value)
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
          <Form.Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              label='Date'
              placeholder='Date'
          />

          <Form.Field
              control={Select}
              onChange={doctorChanged}
              label='Doctors'
              options={doctorsData}
              placeholder='Doctors'
          />
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
    </>
  )

}

export default PatientForm