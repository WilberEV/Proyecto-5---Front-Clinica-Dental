import React, { useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/logoHeader.svg'

import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../layouts/userSlice";

export const Header = () => {

  const dispatch = useDispatch();

  const datosUserRedux = useSelector(userData);

  const navigate = useNavigate()


  const logMeOut = () => {
    dispatch(logout({ credentials: {}}));

    setTimeout(()=>{
      navigate("/");
    },500)
  }

  return (
    <div>
       {!datosUserRedux?.credentials?.token ? (
        <div className="headerBody">
          <div className="headerLogo" onClick={() => navigate("/")}>       
                <img src={logo}/>
                <img src="https://see.fontimg.com/api/renderfont4/YaaO/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiNGRkZGRkYiLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/SGVwaGFlc3R1cw/aspire-demibold.png" />
              </div>
              <div className="headerOptions">
                <div className="headerButton" onClick={() => navigate("/treatments")}>
                  Treatments
                </div>
                <div className="headerButton" onClick={() => navigate("/login")}>
                  Login
                </div>
                <div className="headerButton" onClick={() => navigate("/signup")}>
                  Sign Up
                </div>
              </div>  
      </div>
      ) : (

        <div>
          {datosUserRedux?.credentials?.user.role === "ADMIN" &&

            <div className="adminButton" onClick={() => navigate("/admin")}>
              Admin
            </div>
            }

            <div className="headerBody">
            <div className="headerLogo" onClick={() => navigate("/")}>       
            <img src={logo}/>
            <img src="https://see.fontimg.com/api/renderfont4/YaaO/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiNGRkZGRkYiLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/SGVwaGFlc3R1cw/aspire-demibold.png" />
          </div>
          <div className="headerOptions">
            <div className="headerButton" onClick={() => navigate("/treatments")}>
              Treatments
            </div>
            <div className="headerButton" onClick={() => navigate("/profile")}>
              Profile
            </div>
            <div className="headerButton" onClick={()=>logMeOut()}>
              Logout
            </div>
          </div>  
            </div>
          </div>
      )}
    </div>
  );
};
