import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Table } from "semantic-ui-react";
import ErrorMessage from "../../components/ErrorMessage";
import List from "../../components/List";
import Spinner from "../../components/Spinner";
import useAxiosOnMount from "../../customHooks/useAxiosOnMount";

const Doctors = () => {
  const { data, loading, error, setData } = useAxiosOnMount("/api/doctors");

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  const deleteDoctor = async (id) => {
    let res = await axios.delete(`/api/doctors/${id}`)
    setData( data.filter(d => d.id !== res.data.id))
  }

  return (
    <div>
      <h1>Doctors</h1>
      <Button style={{ marginBottom: "10px" }}>
        <Link to="/doctors/new">Add Doctor</Link>
      </Button>
      <Table singleLine fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Doctor</Table.HeaderCell>
            <Table.HeaderCell>View Appointments</Table.HeaderCell>
            <Table.HeaderCell>Crud Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        
          <List
            renderData={(doc) => {
              return (
                  <Table.Row key={doc.id}>
                    <Table.Cell>{doc.name}</Table.Cell>
                    <Table.Cell>
                      <Link key={doc.id} to={`/doctors/${doc.id}`}>View</Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={{
                          pathname: `/doctors/edit/${doc.id}`,
                          doctor_name: doc.name
                        }}
                      >
                        <Icon name="edit"></Icon>
                      </Link>
                      <Icon
                        onClick={() => deleteDoctor(doc.id)}
                        name="trash"
                      ></Icon>
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

export default Doctors;
