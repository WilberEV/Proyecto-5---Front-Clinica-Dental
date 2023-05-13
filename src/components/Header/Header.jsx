import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/logoHeader.svg'

export const Header = () => {

  const navigate = useNavigate()

  return (
    <>
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
    </>
  );
};
