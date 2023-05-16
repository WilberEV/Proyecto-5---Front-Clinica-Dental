import React from 'react'
import './Treatments.css'
import { useNavigate } from "react-router-dom";
import { images } from '../../components/Images/Images';


export const Treatments = () => {

  const navigate = useNavigate()

  return (
    <div className='treatmentsBody'>
      <div className='treatmentsGrid'>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={images.orthodontics}/>
          <p>Orthodontics</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={images.dentures}/>
          <p>Dentures</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={images.whitening}/>
          <p>Teeth whitening</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={images.bruxism}/>
          <p>Bruxism</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={images.emergencies}/>
          <p>Dental emergencies</p>
        </div>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={images.prevention}/>
          <p>Prevention and dental hygiene</p>
        </div>
      </div>
    </div>
  )
}


