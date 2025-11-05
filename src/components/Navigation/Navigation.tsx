import React, { useEffect } from 'react';
import L from 'leaflet';

const Navigation = ({ isMapVisible}) => {
 
     useEffect(() => {
        if (!isMapVisible) return;
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
  }, [isMapVisible]);
    return (
        <div>
           {isMapVisible && (
      <div id="map" style={{ height: '300px', width: '50%' }}></div>
    )}
        </div>
    );
};

export default Navigation;