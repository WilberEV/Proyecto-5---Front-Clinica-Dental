import React, { useState, useEffect } from "react";
import './Login.css'

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInAccount } from '../../services/apiCalls';
import jwt_decode from "jwt-decode";
import { InputText } from "../../components/InputText/InputText";
import { login, userData } from "../userSlice"


export const Login = () => {

  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  //Hooks
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  //Handler
  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const logMeIn = () => {

    logInAccount(credentials)
      .then((result) => {
        const decoded = jwt_decode(result.data.token);
        const datos = {
          token: result.data.token,
          user: decoded
        }
        //Una vez tengo el token, lo guardo con el dispatch
        dispatch(login({ credentials: datos }));

        setMessage(`Bienvenido de nuevo mr.${decoded.role}`);
        //Nos vamos de aqui....

        setTimeout(() => {
          navigate("/");
        }, 2750);

      })
      .catch((error) => console.log(error));
  };

  useEffect(()=>{
    if(userRdxData.credentials.token){
      navigate("/")
    };
  },[]);


  return (
  <div className='loginBody'>

    {message != "" ? (
        <div>{message}</div>
      ) : (
        <div className="loginContainer">
          <div className="loginContainer2">
            <div>Email:</div>
            <InputText
              type={"email"}
              className={"basicInput"}
              placeholder={""}
              name={"email"}
              handler={inputHandler}
            />
            <div>Password:</div>
            <InputText
              type={"password"}
              className={"basicInput"}
              placeholder={""}
              name={"password"}
              handler={inputHandler}
            />

            <div className="loginButton" onClick={() => logMeIn()}>
              Login
            </div>
          </div>
        </div>
      )}
  </div>
  )
}
