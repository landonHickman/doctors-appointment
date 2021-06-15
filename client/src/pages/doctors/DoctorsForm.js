import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import { Form} from 'semantic-ui-react'

const DoctorsForm = (props) => {
  const [doctorName, setDoctorName] = useState([])
  const history = useHistory()
  const params = useParams()
  const location = useLocation()

  const handleSubmit = async () => {
    try{
      if(params.id){
        await axios.put(`/api/doctors/${params.id}`, {name: doctorName})
      }else{
        await axios.post(`/api/doctors`, {name: doctorName})
      }
    }catch(err){
      console.log('err',err)
    }
    history.push(`/doctors`)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
            <Form.Input
                defaultValue={location.doctor_name}
                onChange={(e) => setDoctorName(e.target.value)}
                fluid 
                label={params.id ? 'Edit Doctor' : 'Add Doctor'}
                placeholder='Name'
            /> 
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  )
}
export default DoctorsForm