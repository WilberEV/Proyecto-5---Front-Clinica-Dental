import React from 'react'
import './Treatments.css'
import { useNavigate } from "react-router-dom";

import orthodontics from '../../assets/img/orthodontics.jpg'
import bruxism from '../../assets/img/bruxism.jpg'
import dentures from '../../assets/img/dentures.jpg'
import emergencies from '../../assets/img/emergencies.png'
import prevention from '../../assets/img/prevention.jpg'
import whitening from '../../assets/img/whitening.jpg'


export const Treatments = () => {

  const navigate = useNavigate()

  return (
    <div className='treatmentsBody'>
      <div className='treatmentsGrid'>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={orthodontics}/>
          <p>Orthodontics</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={dentures}/>
          <p>Dentures</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={whitening}/>
          <p>Teeth whitening</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={bruxism}/>
          <p>Bruxism</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={emergencies}/>
          <p>Dental emergencies</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={prevention}/>
          <p>Prevention and dental hygiene</p>
        </div>
      </div>
    </div>
  )
}
