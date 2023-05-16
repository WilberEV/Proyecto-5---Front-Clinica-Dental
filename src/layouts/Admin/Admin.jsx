import React, { useState, useEffect } from 'react'
import './Admin.css'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { bringUserProfile } from '../../services/apiCalls'
import { UserDetails } from '../../components/UserDetails/UserDetails'
import jwt_decode from "jwt-decode";

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

  const getUsers = (role) => {

    bringUserProfile(role, userRdxData.credentials.token)

      .then((results) => {

        setProfileDetails(results);
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
            <div>What kind of users are you lookginf for?</div>

            <div>
              {profileDetails.length > 0 && (
              <div className="charactersDesign">
                {profileDetails.map((person) => {
                  return (
                    <div key={person._id}>
                      <UserDetails
                        name={person.name}
                        status={person.lastname}
                        dni={person.dni}
                        email={person.email}
                        phone={person.phone}
                        role={person.role}
                        createdAt={person.createdAt}
                        updatedAt={person.updatedAt}
                      />
                    </div>
                  );
                })}
              </div>
              )}
            </div>

          </div>
        </div>
    </div>
  )
}
