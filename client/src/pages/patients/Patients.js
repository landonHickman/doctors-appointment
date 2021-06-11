import React from 'react'
import { Link} from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import List from '../../components/List'
import Spinner from '../../components/Spinner'
import useAxiosOnMount from '../../customHooks/useAxiosOnMount'

const Patients = () => {
  const {data, loading, error} = useAxiosOnMount('/api/patients')

  if(loading) return <Spinner />
  if(error) return <ErrorMessage error={error}/>

  return(
    <div>
      <List 
      renderData={(patient)=>{
        return(
          <Link key={patient.id} to={`/patients/${patient.id}`}>
            <h1>{patient.name}</h1>
          </Link>
        )
      }}
      data={data}
      name='Patients'/>
    </div>
  )
}

export default Patients