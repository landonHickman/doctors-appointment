import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import { Form} from 'semantic-ui-react'

const PatientForm = (props) => {
  const [patientName, setPatientName] = useState([])
  const history = useHistory()
  const params = useParams()
  const location = useLocation()

  const handleSubmit = async () => {
    try{
      if(params.id){
        await axios.put(`/api/patients/${params.id}`, {name: patientName})
      }else{
        await axios.post(`/api/patients`, {name: patientName})
      }
    }catch(err){
      console.log('err',err)
    }
    history.push(`/patients`)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
            <Form.Input
                defaultValue={location.patient_name}
                onChange={(e) => setPatientName(e.target.value)}
                fluid 
                label={params.id ? 'Edit Patient' : 'Add Patient'}
                placeholder='Name'
            /> 
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  )
}
export default PatientForm