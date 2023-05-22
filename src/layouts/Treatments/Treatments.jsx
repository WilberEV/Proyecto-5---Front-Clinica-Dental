import React from 'react'
import './Treatments.css'
import { useNavigate } from "react-router-dom";
import { images } from '../../components/Images/Images';
import { Modals } from '../../components/Modals/Modals';



export const Treatments = () => {

  return (
    <div className='treatmentsBody'>
      <div className='treatmentsGrid'>
      <div className='treatmentsCard'>
          <img src={images.orthodontics}/>
          <p>Orthodontics</p>
          <Modals/>
        </div>
        <div className='treatmentsCard' >
          <img src={images.dentures}/>
          <p>Dentures</p>
          <Modals/>
        </div>
        <div className='treatmentsCard' >
          <img src={images.whitening}/>
          <p>Teeth whitening</p>
          <Modals/>
        </div>
        <div className='treatmentsCard' >
          <img src={images.bruxism}/>
          <p>Bruxism</p>
          <Modals/>
        </div>
        <div className='treatmentsCard'>
          <img src={images.emergencies}/>
          <p>Dental emergencies</p>
          <Modals/>
        </div>
        <div className='treatmentsCard'>
          <img src={images.prevention}/>
          <p>Prevention and dental hygiene</p>
          <Modals/>
        </div>
      </div>
    </div>
  )
}


