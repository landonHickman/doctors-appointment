import axios from 'axios'
import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

const AppointmentForm = (props) => {
  const {patientsData, doctorsData, addApp, editApp, id} = props

  const [date, setDate] = useState('')
  const [patientID, setPatientID] = useState('')
  const [doctorID, setDoctorID] = useState('')

  const handleSubmit = async () => {
    try{
      if(id){
        let res = await axios.put(`/api/appointments/${id}`, 
        {date: date, patient_id: patientID, doctor_id: doctorID}
      )
      editApp(res.data)
      }else {
        let res = await axios.post(`/api/appointments`, 
          {date: date, patient_id: patientID, doctor_id: doctorID}
        )
        addApp(res.data)
      }
    } catch(err) {
      console.log('err',err)
    }
  }

  const patientChanged = (e, {value}) => {
    setPatientID(value)
  }

  const doctorChanged = (e, {value}) => {
    setDoctorID(value)
  }

  return(
    <div>
      
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
                        onChange={patientChanged}
                        fluid
                        label='Patient'
                        options={patientsData}
                        placeholder='Patient'
                    />
                    <Form.Select
                        onChange={doctorChanged}
                        fluid
                        label='Doctor'
                        options={doctorsData}
                        placeholder='Doctor'
                    />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
    </div>
  )
}

export default AppointmentForm