import React, { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { statusOptions } from "../../Options/statusOptions";
import { doctors } from "../../Options/doctors";

const Add = ({ patients, setPatients, setIsAdding }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [lastVisit, setLastVisit] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [condition, setCondition] = useState("");
  const [action, setAction] = useState("");
  const [status, setStatus] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !lastVisit ||
      !assignedTo ||
      !condition ||
      !action ||
      !status
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true
      });
    }

    const id = patients.length + 1;
    const newPatients = {
      id,
      firstName,
      lastName,
      dateOfBirth,
      lastVisit,
      assignedTo,
      condition,
      action,
      status
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/add_patient_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatients),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('Error posting data:', error);
    }

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add New Patient</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="dateOfBirth">Date Of Birth</label>
        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label htmlFor="lastVisit">Last Visit</label>
        <input
          id="lastVisit"
          type="date"
          name="lastVisit"
          value={lastVisit}
          onChange={(e) => setLastVisit(e.target.value)}
        />
        <label htmlFor="assignedTo">Doctor Assigned</label>
        <select
          id="assignedTo"
          name="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>
        <label htmlFor="condition">Condition/Notes</label>
        <input
          id="condition"
          type="text"
          name="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
        <label htmlFor="action">Action Required</label>
        <input
          id="action"
          type="text"
          name="action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          {statusOptions.map((statusOption, index) => (
            <option key={index} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};
Add.propTypes = {
  patients: PropTypes.array.isRequired,
  setPatients: PropTypes.func.isRequired,
  setIsAdding: PropTypes.func.isRequired
};

export default Add;
