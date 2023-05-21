import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Treatments.css'
import { useNavigate } from "react-router-dom";
import { images } from '../../components/Images/Images';
import { Modals } from '../../components/Modals/Modals';
import { TreatmentDetails } from "../../components/TreatmentDetails/TreatmentDetails";
import { detailData, bringDetails } from "../detailSlice";


export const Treatments = () => {

  const treatmentRdxData = useSelector(detailData);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const detailHandler = (e) => {
    TreatmentDetails(e)
    .then((result) => {
      const datos = {
        name: result.name,
        description: result.description
      }
    //Una vez tengo el token, lo guardo con el dispatch
    dispatch(bringDetails({ datos }));
    })
    .catch((error) => console.log(error));
  }

  return (
    <div className='treatmentsBody'>
      <div className='treatmentsGrid'>
        <div className='treatmentsCard' onClick={() => navigate("/appointments")}>
          <img src={images.orthodontics}/>
          <p>Orthodontics</p>
          <Modals/>
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


