import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Appointments.css";
import {
  bringDentists,
  bringUserProfile,
  findAppointment,
  generateAppointment,
} from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

import Dropdown from "react-bootstrap/Dropdown";

export const Appointments = () => {
  const userRdxData = useSelector(userData);
  const [dentistList, setDentistList] = useState([]);
  const [searchApp, setSearchApp] = useState(false);
  const [newAppointment, setNewAppointment] = useState(false);

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  //Hooks
  const [userDetails, setUserDetails] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [appointmentsDetails, setAppointmentsDetails] = useState({
    client: userRdxData.credentials.token,
    doctor: "",
    start: "",
    end: "",
  });

  const [newAppointmentData, setNewAppointmentData] = useState({
    client: userRdxData.credentials.user.id,
    doctor: "",
    start: "",
    end: "",
  });

  //Bring User's profile data
  useEffect(() => {
    bringUserProfile(
      userRdxData.credentials.user.id,
      userRdxData.credentials.token
    )
      .then((results) => {
        setUserDetails(results.data);
      })
      .catch((error) => console.log(error));
  }, [userDetails]);

  //Bring list of doctors
  useEffect(() => {
    if (dentistList.length === 0) {
      bringDentists("DOCTOR", userRdxData.credentials.token)
        .then((results) => {
          setDentistList(results.data);
        })
        .catch((error) => console.log(error));
    }
  }, [dentistList]);

  //Bring User's apppointments data
  const getAppointments = () => {
    dontCreateAppointment(),
    findAppointment("", "", userRdxData.credentials.token)
      .then((results) => {
        lookForApp(), setAppointmentsDetails(results.data);
      })
      .catch((error) => console.log(error));
  };

  //Set Doctor for the appointment
  const appDoctorHandler = (e) => {
    setNewAppointmentData((prevState) => ({
      ...prevState,
      doctor: e._id,
    }));
  };

  //Set start and end date for a new Appointment
  const appDateHandler = (e) => {
    const selectedStart = e.target.value;
    const selectedEnd = new Date(selectedStart);
    selectedEnd.setHours(selectedEnd.getHours() + 2);
    selectedEnd.setMinutes(selectedEnd.getMinutes() + 40);

    setNewAppointmentData((prevState) => ({
      ...prevState,
      start: selectedStart,
      end: selectedEnd.toISOString().slice(0, 16),
    }));
  };

  //Functions
  const confirmNewAppointment = () => {
    generateAppointment(newAppointmentData, userRdxData.credentials.token)
      .then(() => {
        setNewAppointment(false);
      })
      .catch((error) => console.log(error));
  };

  const lookForApp = () => setSearchApp(true);
  const dontLookForApp = () => setSearchApp(false);
  const createAppointment = () => setNewAppointment(true);
  const dontCreateAppointment = () => setNewAppointment(false);

  return (
    <div className="appointmentsBody">
      {newAppointment == false && searchApp == false && (
        <div className="appointmentsButtonContainer">
          <div className="appointmentButton" onClick={() => getAppointments()}>
            My appointments
          </div>
          <div className="appointmentButton" onClick={() => createAppointment()}>
            New Appointment
          </div>
        </div>
      )}

      <div className="appointmentsContainer">
        {newAppointment == true && searchApp == false && (
          <div>
            <div className="appointmentsContainer2">
              <div>Client's details</div>

              <div className="appointmentsContainer2">
                {userDetails.map((person) => {
                  return (
                    <div>
                      <div>Name: {person.name}</div>
                      <div>Lastname: {person.lastname}</div>
                      <div>Email: {person.email}</div>
                      <div>Phone Number: {person.phone}</div>
                    </div>
                  );
                })}
              </div>

              <div>Please select your Doctor</div>

              <div>
                {dentistList.length > 0 && (
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Select your Doctor
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {dentistList.map((professional) => {
                        return (
                          <Dropdown.Item
                            key={professional._id}
                            href="#/action-1"
                            onClick={() => appDoctorHandler(professional)}
                          >
                            {professional.name} {professional.lastname}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                <div>{newAppointmentData.doctor}</div>
              </div>
              <div>Please select a date</div>
              <div>
                <input
                  type="datetime-local"
                  id="start"
                  name="start"
                  min="2023-05-22T08:00"
                  max="2024-12-31T18:00"
                  onChange={(e) => appDateHandler(e)}
                />
              </div>
            </div>
            <div className="appointmentButtonContainer">
              <div
                className="appointmentButton"
                onClick={() => confirmNewAppointment()}
              >
                Confirm
              </div>
              <div
                className="appointmentButton"
                onClick={() => dontCreateAppointment()}
              >
                Cancel
              </div>
            </div>
          </div>
        )}

        {newAppointment == false && searchApp == true && (
          <div className="appointmentsContainer2">
            {appointmentsDetails.doctor !== "" ? (
              <div className="appointmentsContainer2">
                {appointmentsDetails.length > 0 && (
                  <div>
                    {appointmentsDetails.map((appInfo) => {
                      return (
                        <div className="appInformation" key={appInfo._id}>
                          <div className="userSplit"></div>
                          <div>ID: {appInfo._id}</div>
                          <div>Client: {appInfo.client}</div>
                          <div>Doctor: {appInfo.doctor}</div>
                          <div>Start: {appInfo.start}</div>
                          <div>End: {appInfo.end}</div>
                          <div className="userSplit"></div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="appointmentButton" onClick={() => dontLookForApp()}>
                  Go back
                </div>
              </div>
            ) : (
              <div>CARGANDO</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
