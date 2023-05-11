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
  const inputHandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const logMeFunction = () => {

    logInAccount(credentials)
      .then((resultado) => {
        
        const decoded = jwt_decode(resultado.data.token);

        const datos = {
          token: resultado.data.token,
          user: decoded
        }
        //Una vez tengo el token, lo guardo con el dispatch
        dispatch(login({ credentials: datos }));

        setMessage(`Bienvenido de nuevo mr.${decoded.email}`);
        //Nos vamos de aqui....

        setTimeout(() => {
          navigate("/");
        }, 2750);

      })
      .catch((error) => console.log(error));
  };

  useEffect(()=>{

      console.log(userRdxData,'////////////')
  
  },[]);

  return (
    <div className='loginBody'>

{message != "" ? (
        <div>{message}</div>
      ) : (
        <div>
          <InputText
            type={"email"}
            className={"basicInput"}
            placeholder={""}
            name={"email"}
            handler={inputHandlerFunction}
          />

          <InputText
            type={"password"}
            className={"basicInput"}
            placeholder={""}
            name={"password"}
            handler={inputHandlerFunction}
          />

          <div className="loginButton" onClick={() => logMeFunction()}>
            Login!
          </div>
        </div>
      )}

    </div>
  )
}
