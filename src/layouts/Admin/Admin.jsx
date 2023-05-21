import React, { useState, useEffect } from "react";
import "./Admin.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { bringUserProfile, findAppointment } from "../../services/apiCalls";
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

  const [userEmail, setUserEmail] = useState({
    email: "",
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

  const inputHandler = (e) => {
    setUserEmail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getUsers = (role) => {
    bringUserProfile(role, userRdxData.credentials.token)
      .then((results) => {
        dontLookForApp();
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

  const updateAppHandler = (e) => {
    findApp(),
      setAppointmentsDetails((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
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
          {profileDetails.length > 0 && searchApp === false && (
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
                <div className="appInformation" key={appInfo._id}>
                  <InputText
                    type={"doctor"}
                    className={"basicInput"}
                    defaultValue={appointmentsDetails.doctor}
                    name={"doctor"}
                    handler={updateAppHandler}
                  />
                  <InputText
                    type={"start"}
                    className={"basicInput"}
                    name={"start"}
                    defaultValue={appointmentsDetails.start}
                    handler={updateAppHandler}
                  />
                  <InputText
                    type={"end"}
                    className={"basicInput"}
                    name={"end"}
                    defaultValue={appointmentsDetails.end}
                    handler={updateAppHandler}
                  />
                </div>
              </div>
            )}
        </div>
        <div className="adminRigthContainer">
          <InputText
            type={"email"}
            className={"basicInput"}
            placeholder={""}
            name={"email"}
            handler={inputHandler}
          />
          <div className="adminRigthButtonsContainer">
            {searchApp === false && (
              <div
                className="adminRigthButtons"
                onClick={() => getUsers(userEmail.email)}
              >
                Find
              </div>
            )}
            {searchApp === true && (
              <div
                className="adminRigthButtons"
                onClick={() => getAppointments()}
              >
                Find
              </div>
            )}
            <div
              className="adminRigthButtons"
              onClick={() => updateAppHandler()}
            >
              Edit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
