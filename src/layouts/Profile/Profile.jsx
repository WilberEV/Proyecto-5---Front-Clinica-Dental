import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { bringUserProfile, updateUserProfile } from "../../services/apiCalls";
import { InputText } from "../../components/InputText/InputText";

export const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    phone: "",
    createdAt: "",
  });

  const [newData, setNewData] = useState({
    email: '',
    phone: '',
    password: ''
  })

  const [editUser, setEditUser] = useState(false);

  //Instancio conexion a RDX en modo lectura

  const userRdxData = useSelector(userData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    bringUserProfile(
      userRdxData.credentials.user.id,
      userRdxData.credentials.token
    )
      .then((results) => {
        setProfileDetails(results);
      })
      .catch((error) => console.log(error));
  }, [profileDetails]);

  const inputHandler = (e) => {
    setNewData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateUser = () =>{
    updateUserProfile(
      userRdxData.credentials.user.id,
      newData,
      userRdxData.credentials.token
      )
      .then(() => dontChangeUser())
      .catch((error)=> console.group(error))  
  }

  const changeUser = () => setEditUser(true);
  const dontChangeUser = () => setEditUser(false);


  return (
    <div className="profileBody">


      {editUser == false && (
        <div className="profileContainer">
          {profileDetails.name !== "" ? (
            <div className="profileContainer2">
              <div>Name: {profileDetails.data.name}</div>
              <div>Lastname: {profileDetails.data.lastname}</div>
              <div>DNI: {profileDetails.data.dni}</div>
              <div>Email: {profileDetails.data.email}</div>
              <div>Phone Number: {profileDetails.data.phone}</div>
            </div>
          ) : (
            <div>CARGANDO</div>
          )}
        </div>
      )}


      {editUser == true && (
        <div className="profileContainer">
          <div className="profileContainer2">
          <InputText
              type={"email"}
              className={"basicInput"}
              defaultValue={profileDetails.data.email}
              name={"email"}
              handler={inputHandler}
            />
          <InputText
              type={"phone"}
              className={"basicInput"}
              name={"phone"}
              defaultValue={profileDetails.data.phone}
              handler={inputHandler}
            />
          <InputText
              type={"password"}
              className={"basicInput"}
              placeholder={"Password"}
              name={"password"}
              handler={inputHandler}
            />
          </div>
          <div className="profileButton" onClick={() => updateUser()}>
          Change
          </div>
          <div className="profileButton" onClick={() => dontChangeUser()}>
          Cancel
          </div>
        </div>
      )}
      <div className="profileContainer3">
        <div className="profileButton" onClick={() => changeUser()}>
          Edit
        </div>
        <div className="profileButton" onClick={() => navigate("/appointments")}>
          Appointments
        </div>
      </div>
    </div>
  );
};
