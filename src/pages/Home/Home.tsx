import { Button } from '@/components/ui/button.js';
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Home = () => {
   const  handlenav =()=>{
    if(document.getElementById("map")?.classList.contains("hidden")){
    document.getElementById("map")?.classList.remove("hidden")
      document.getElementById("map")?.classList.add("block")
    }
   else{
     document.getElementById("map")?.classList.remove("block")
    document.getElementById("map")?.classList.add("hidden")
   }
}

  useEffect(() => {
    // Initialize the map after the component mounts
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker
    const marker = L.marker([51.505, -0.09]).addTo(map);
    marker.bindPopup("<b>Hello!</b><br>I am a marker.").openPopup();

    // Locate user
    map.locate({ setView: true, maxZoom: 16 });

    function onLocationFound(e) {
      const radius = e.accuracy;

      L.marker(e.latlng).addTo(map)
        .bindPopup(`You are within ${radius.toFixed(0)} meters from this point`).openPopup();

      L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
      alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // Cleanup function to remove map on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <h1>This is a weather app</h1>
      <Button variant={'outline'} onClick={handlenav}>Address Navigation</Button>
      <div id="map" style={{ height: '300px', width: '50%' }}></div>
    </div>
  );
};

export default Home;
