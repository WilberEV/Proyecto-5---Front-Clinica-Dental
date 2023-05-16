import React from 'react'
import './Home.css'
import { images } from '../../components/Images/Images'

export const Home = () => {


  return (
    <>
      <div className='homeBody'>
        <div className='homeTitle'>
          <img src={images.logo}/>
          <img src="https://see.fontimg.com/api/renderfont4/YaaO/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiMwMDAwMDAiLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/SGVwaGFlc3R1cw/aspire-demibold.png"/>
        </div>
        <div className='homeSubtitle'>
          <img src="https://see.fontimg.com/api/renderfont4/YaaO/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiMwMDAwMDAiLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/Rm9yZ2luZyB0aGUgc21pbGVz/aspire-demibold.png"/>
          <img src="https://see.fontimg.com/api/renderfont4/YaaO/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiMwMDAwMDAiLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/b2YgdGhlIEZ1dHVyZQ/aspire-demibold.png" />
        </div>
        <div className='homeSplit'>
          <img src={images.split}/>
        </div>
        <div className='homeBlock1'>
          <img src={images.block1}/>
          <div className='verticalSplit'></div>
          <p>
            For us, each patient deserves the utmost respect for the trust they place in choosing us. 
            We assume each treatment with great responsibility, since the patient delegates to us the care of his dental health and the transformation of his smile. 
            When someone's health is in our hands, there are no excuses for giving our best effort to obtain the best results.          
          </p>
        </div>
      </div>
    </>

  )
}