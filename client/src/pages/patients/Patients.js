import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Table } from "semantic-ui-react";
import ErrorMessage from "../../components/ErrorMessage";
import List from "../../components/List";
import Spinner from "../../components/Spinner";
import useAxiosOnMount from "../../customHooks/useAxiosOnMount";

const Patients = () => {
  const { data, loading, error, setData } = useAxiosOnMount("/api/patients");

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  const deletePatient = async (id) => {
    let res = await axios.delete(`/api/patients/${id}`)
    setData( data.filter (d => d.id !== res.data.id))
  }

  return (
    <div>
      <h1>Patients</h1>
      <Button style={{ marginBottom: "10px" }}>
        <Link to="/patients/new">Add Patient</Link>
      </Button>
      <Table singleLine fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Patient </Table.HeaderCell>
            <Table.HeaderCell>View Appointments</Table.HeaderCell>
            <Table.HeaderCell>Crud Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <List
            renderData={(patient) => {
              return (
                <Table.Row key={patient.id}>
                  <Table.Cell>{patient.name}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/patients/${patient.id}`}>View</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={{
                        pathname: `/patients/edit/${patient.id}`,
                        patient_name: patient.name
                      }}
                    >
                      <Icon name="edit"></Icon>
                    </Link>
                    <Icon onClick={()=>deletePatient(patient.id)} name='trash'></Icon>
                  </Table.Cell>
                </Table.Row>
              );
            }}
            data={data}
          />
        </Table.Body>
      </Table>
    </div>
  );
};

export default Patients;
