import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { SignUp } from '../SignUp/SignUp';
import { Appointments } from '../Appointments/Appointments';
import { Profile } from '../Profile/Profile';


export const Body = () => {
  return (
    <div>
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>
  )
}
