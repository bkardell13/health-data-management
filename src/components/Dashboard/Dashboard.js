import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

import { patientData } from "../../PatientData/data";

const Dashboard = ({ setAuthenticatedUser, authenticatedUser, userEmail }) => {
  const [patients, setPatients] = useState(patientData);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("patients_data"));
  //   if (data !== null && Object.keys(data).length !== 0) setPatients(data);
  // }, []);

  useEffect(() => {
    if (authenticatedUser === "patient") {
      let patientCopy = [];
      patientData.forEach((patient, i) => {
        if (patient.email === userEmail) {
          patientCopy.push(patient);
        }
      });
      setPatients(patientCopy);
    }
  }, [authenticatedUser, userEmail]);

  const handleEdit = (id) => {
    const [patient] = patients.filter((patient) => patient.id === id);

    setSelectedPatient(patient);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((result) => {
      if (result.value) {
        const [patient] = patients.filter((patient) => patient.id === id);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${patient.firstName} ${patient.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500
        });

        const patientsCopy = patients.filter((patient) => patient.id !== id);
        localStorage.setItem("patients_data", JSON.stringify(patientsCopy));
        setPatients(patientsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            authenticatedUser={authenticatedUser}
            setIsAdding={setIsAdding}
            setIsAuthenticated={setAuthenticatedUser}
          />
          <Table
            authenticatedUser={authenticatedUser}
            patients={patients}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          patients={patients}
          setPatients={setPatients}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          authenticatedUser={authenticatedUser}
          patients={patients}
          selectedPatient={selectedPatient}
          setPatients={setPatients}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};
Dashboard.propTypes = {
  setAuthenticatedUser: PropTypes.func.isRequired,
  authenticatedUser: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired
};

export default Dashboard;
