import React, { useState, useEffect } from "react";
import "./Admin.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import {
  bringUserProfile,
  findAppointment,
  updateAppointment,
} from "../../services/apiCalls";
import jwt_decode from "jwt-decode";
import { InputText } from "../../components/InputText/InputText";

export const Admin = () => {
  const navigate = useNavigate();

  const [searchApp, setSearchApp] = useState(false);
  const [editApp, setEditApp] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    _id: "",
    name: "",
    lastname: "",
    dni: "",
    email: "",
    phone: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  const [appointmentsDetails, setAppointmentsDetails] = useState({
    client: "",
    doctor: "",
    start: "",
    end: "",
  });

  const [userID, setUserID] = useState({
    id: "",
  });

  const [appID, setAppID] = useState({
    _id: "",
    doctor: "",
    start: "",
    end: "",
    active: "",
  });

  const userRdxData = useSelector(userData);

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      const decoded = jwt_decode(userRdxData.credentials.token);
      if (decoded.role !== "ADMIN") {
        navigate("/");
      }
    }
  }, []);

  const getUsers = (role) => {
    bringUserProfile(role, userRdxData.credentials.token)
      .then((results) => {
        dontLookForApp();
        dontFindForApp();
        setProfileDetails(results.data);
      })
      .catch((error) => console.log(error));
  };

  const getAppointments = () => {
    findAppointment("", "", userRdxData.credentials.token)
      .then((results) => {
        lookForApp(), setAppointmentsDetails(results.data);
      })
      .catch((error) => console.log(error));
  };

  const editAppointments = () => {
    updateAppointment(appID, userRdxData.credentials.token)
      .then((results) => {
        dontLookForApp(), setAppointmentsDetails(results.data);
      })
      .catch((error) => console.log(error));
  };

  //Hadlers
  const userHandler = (e) => {
    setUserID((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateAppHandler = (e) => {
    findApp();
    setAppID((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const appDateHandler = (e) => {
    const selectedStart = e.target.value;
    const selectedEnd = new Date(selectedStart);
    selectedEnd.setHours(selectedEnd.getHours() + 2);
    selectedEnd.setMinutes(selectedEnd.getMinutes() + 40);

    setAppID((prevState) => ({
      ...prevState,
      start: selectedStart,
      end: selectedEnd.toISOString().slice(0, 16),
    }));
  };

  const lookForApp = () => setSearchApp(true);
  const dontLookForApp = () => setSearchApp(false);
  const findApp = () => setEditApp(true);
  const dontFindForApp = () => setEditApp(false);

  return (
    <div className="adminBody">
      <div className="adminContainer">
        <div className="adminButtonsContainer">
          <div className="adminButtons" onClick={() => getUsers("USER")}>
            Users
          </div>
          <div className="adminButtons" onClick={() => getUsers("DOCTOR")}>
            Doctors
          </div>
          <div className="adminButtons" onClick={() => getUsers("ADMIN")}>
            Admins
          </div>
          <div className="adminButtons" onClick={() => getAppointments()}>
            Appointments
          </div>
        </div>
        <div className="adminInfo">
          {profileDetails.length > 0 &&
            searchApp === false &&
            editApp === false && (
              <div>
                {profileDetails.map((person) => {
                  return (
                    <div className="userInformation" key={person._id}>
                      <div className="userSplit"></div>
                      <div>ID: {person._id}</div>
                      <div>Name: {person.name}</div>
                      <div>Lastname: {person.lastname}</div>
                      <div>DNI: {person.dni}</div>
                      <div>Email: {person.email}</div>
                      <div>Phone number: {person.phone}</div>
                      <div>Role: {person.role}</div>
                      <div>Creation Date: {person.createdAt}</div>
                      <div>Last update: {person.updatedAt}</div>
                      <div className="userSplit"></div>
                    </div>
                  );
                })}
              </div>
            )}

          {appointmentsDetails.length > 0 &&
            searchApp === true &&
            editApp === false && (
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

          {appointmentsDetails.length > 0 &&
            searchApp === true &&
            editApp === true && (
              <div>
                <div className="appInformation">
                  <InputText
                    type={"doctor"}
                    className={"basicInput"}
                    placeholder={"Doctor's ID"}
                    name={"doctor"}
                    handler={updateAppHandler}
                  />
                  <input
                    type="datetime-local"
                    id="start"
                    name="start"
                    min="2023-05-22T08:00"
                    max="2024-12-31T18:00"
                    onChange={(e) => appDateHandler(e)}
                  />
                  <div>Is the Appointment active?</div>
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    onChange={(e) => updateAppHandler(e)}
                  />
                </div>
              </div>
            )}

          {appointmentsDetails.length > 0 &&
            searchApp === false &&
            editApp === true && (
              <div className="userInformation">
                <div>Client: {appointmentsDetails.client}</div>
                <div>Doctor: {appointmentsDetails.doctor}</div>
                <div>Start: {appointmentsDetails.start}</div>
                <div>End: {appointmentsDetails.end}</div>
              </div>
            )}
        </div>

        {searchApp === false && (
          <div className="adminRigthContainer">
            <InputText
              type={"id"}
              className={"basicInput"}
              placeholder={"User's ID"}
              name={"id"}
              handler={userHandler}
            />
            <div className="adminRigthButtonsContainer">
              <div
                className="adminRigthButtons"
                onClick={() => getUsers(userID.id)}
              >
                Find
              </div>

              <div
                className="adminRigthButtons"
                onClick={() => updateAppHandler(appID)}
              >
                Edit
              </div>
            </div>
          </div>
        )}

        {searchApp === true && (
          <div className="adminRigthContainer">
            <InputText
              type={"_id"}
              className={"basicInput"}
              placeholder={"Appointments' ID"}
              name={"_id"}
              handler={updateAppHandler}
            />
            <div className="adminRigthButtonsContainer">
              <div
                className="adminRigthButtons"
                onClick={() => editAppointments()}
              >
                Edit
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
