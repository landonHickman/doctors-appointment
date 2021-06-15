import React from "react";
import ErrorMessage from "../../components/ErrorMessage";
import List from "../../components/List";
import Spinner from "../../components/Spinner";
import useAxiosOnMount from "../../customHooks/useAxiosOnMount";
import AppointmentForm from "./AppointmentForm";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon, Table } from "semantic-ui-react";

const Appointments = () => {
  const { data, loading, error, setData } =
    useAxiosOnMount("/api/appointments");

  const addApp = (app) => {
    setData([app, ...data]);
  };

  const deleteApp = async (id) => {
    let res = await axios.delete(`/api/appointments/${id}`);
    setData(data.filter((a) => a.id !== res.data.id));
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>Appointments</h1>
      <AppointmentForm addApp={addApp} />
      <Table singleLine fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Doctor</Table.HeaderCell>
            <Table.HeaderCell>Patient </Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Crud Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <List
            renderData={(app) => {
              return (
                <Table.Row key={app.id}>
                  <Table.Cell>{app.doctorName}</Table.Cell>
                  <Table.Cell>{app.patientName}</Table.Cell>
                  <Table.Cell>{app.date}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={{
                        pathname: `/appointments/edit/${app.id}`,
                        patient_id: app.patient_id,
                        patientName: app.patientName,
                        doctor_id: app.doctor_id,
                        date: app.date,
                      }}
                    >
                      <Icon name="edit"></Icon>
                    </Link>
                    <Icon onClick={() => deleteApp(app.id)} name="trash"></Icon>
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

export default Appointments;
