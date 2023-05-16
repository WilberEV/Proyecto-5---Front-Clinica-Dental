import React, { useState, useEffect } from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { bringUserProfile } from '../../services/apiCalls'




export const Profile = () => {

  const [profileDetails, setProfileDetails] = useState({
    "name": "",
    "lastname": "",
    "dni": "",
    "email": "",
    "phone": "",
    "createdAt": "",    
  });

    //Instancio conexion a RDX en modo lectura
  
    const userRdxData = useSelector(userData);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!userRdxData.credentials.token) {
        navigate("/");
      }
    }, []);
  
    useEffect(() => {
      bringUserProfile(userRdxData.credentials.user.id, userRdxData.credentials.token)
        .then((results) => {
          setProfileDetails(results);
        })
        .catch((error) => console.log(error));
    }, [profileDetails]);
  
    return (
      <div className="profileBody">
        {profileDetails.name !== "" ? (
          <div className="profileContainer">
            <div className="profileContainer2">
              <div>Name: {profileDetails.data.name}</div>
              <div>Lastname: {profileDetails.data.lastname}</div>
              <div>DNI: {profileDetails.data.dni}</div>
              <div>Email: {profileDetails.data.email}</div>
              <div>Phone Number: {profileDetails.data.phone}</div>
              <div>Creation Date: {profileDetails.data.createdAt}</div>
            </div>
          </div>
          
        ) : (
          <div>CARGANDO</div>
        )}
      </div>
    );
  };