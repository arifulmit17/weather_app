import { Button } from '@/components/ui/button.js';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navigation from '@/components/Navigation/Navigation.js';

const Home = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);

const handlenav=()=>{
  setIsMapVisible((prev)=>(!prev))
}

 
 
 

  return (
    <div>
      <h1>This is a weather app</h1>
      <Button variant={'outline'} onClick={handlenav}>Address Navigation</Button>
      <Navigation isMapVisible={isMapVisible} ></Navigation>
      
    </div>
  );
};

export default Home;
