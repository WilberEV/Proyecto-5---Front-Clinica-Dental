import React, { useState, useEffect } from 'react'
import './Admin.css'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { bringUserProfile } from '../../services/apiCalls'
import { UserDetails } from '../../components/UserDetails/UserDetails'
import jwt_decode from "jwt-decode";
import { InputText } from "../../components/InputText/InputText";

export const Admin = () => {

  const [profileDetails, setProfileDetails] = useState({
    "_id" : "",
    "name" : "",
    "lastname" : "",
    "dni" : "",
    "email" : "",
    "phone" : "",
    "role" : "",
    "createdAt" : "",
    "updatedAt" : "", 
  });

  const userRdxData = useSelector(userData);
    
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      const decoded = jwt_decode(userRdxData.credentials.token);
      if (decoded.role !== "ADMIN"){
        navigate("/");
      }      
    }
  }, []);

  const inputHandler = (e) => {
    setProfileDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getUsers = async (role) => {

    await bringUserProfile(role, userRdxData.credentials.token).then((results) => {
        setProfileDetails(results.data);
      })
      .catch((error) => console.log(error));
  };
  

  return (
    <div className="adminBody">
        <div className="adminContainer">
          <div className="adminButtonsContainer">
            <div className="adminButtons" onClick={() => getUsers("USER")}>Users</div>
            <div className="adminButtons" onClick={() => getUsers("DOCTOR")}>Doctors</div>
            <div className="adminButtons" onClick={() => getUsers("ADMIN")}>Admins</div>
            <div className="adminButtons">Appointments</div>
          </div>
          <div className="adminInfo">

              {profileDetails.length > 0 && (
              <div className="userInformation">
                {profileDetails.map((person) => {
                  return (
                    <div key={person._id}>
                      <UserDetails
                        name={['Name: ', person.name]}
                        lastname={['Lastname: ',person.lastname]}
                        dni={['DNI: ',person.dni]}
                        email={['Email: ',person.email]}
                        phone={['Phone number: ',person.phone]}
                        role={['Role: ',person.role]}
                        createdAt={['Creation Date: ',person.createdAt]}
                        updatedAt={['Last update: ',person.updatedAt]}
                      />
                    </div>
                  );
                })}
              </div>
              )}

          </div>
          <div>
            <div>
            <InputText
              type={"email"}
              className={"basicInput"}
              placeholder={""}
              name={"email"}
              handler={inputHandler}
            />
              <div className="adminButtons" onClick={() => getUsers(profileDetails.email)}>Users</div>
            </div>
          </div>
        </div>
    </div>
  )
}
