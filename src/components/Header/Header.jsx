import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="headerBody">
        <div className="headerButton" onClick={() => navigate("/")}>
          Home
        </div>
        <div className="headerButton" onClick={() => navigate("/")}>
          Tratamientos
        </div>
        <div className="headerButton" onClick={() => navigate("/login")}>
          Login
        </div>
        <div className="headerButton" onClick={() => navigate("/signup")}>
          Sign Up
        </div>
      </div>
    </>
  );
};
