import React, { useState, useEffect } from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { bringUserProfile } from '../../services/apiCalls'




export const Profile = () => {

    const [datosPerfilUser, setDatosPerfilUser] = useState({});

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
          setDatosPerfilUser(results);
        })
        .catch((error) => console.log(error));
    }, [datosPerfilUser]);
  
    return (
      <div className="profileBody">
        {datosPerfilUser.id !== "" ? (
          <div className="profileContainer">
            <div className="profileContainer2">
              <div>Name: {datosPerfilUser.data.name}</div>
              <div>Lastname: {datosPerfilUser.data.lastname}</div>
              <div>DNI: {datosPerfilUser.data.dni}</div>
              <div>Email: {datosPerfilUser.data.email}</div>
              <div>Phone Number: {datosPerfilUser.data.phone}</div>
              <div>Creation Date: {datosPerfilUser.data.createdAt}</div>
            </div>
          </div>
          
        ) : (
          <div>CARGANDO</div>
        )}
      </div>
    );
  };