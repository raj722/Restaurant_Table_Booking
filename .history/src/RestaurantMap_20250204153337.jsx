import React from 'react';
import { Card } from '@/components/ui/card';

const RestaurantMap = ({ address, name }) => {
  // We'll set Nepal's coordinates as fallback
  const [coordinates, setCoordinates] = React.useState({ 
    lat: 27.7172, 
    lng: 85.3240 // Kathmandu coordinates as default
  });

  React.useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Create a geocoder to convert address to coordinates
      const geocoder = new window.google.maps.Geocoder();
      
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          setCoordinates({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
        }
      });

      // Initialize map
      const map = new window.google.maps.Map(document.getElementById('restaurant-map'), {
        center: coordinates,
        zoom: 15,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'simplified' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
          }
        ]
      });

      // Add a marker for the restaurant
      const marker = new window.google.maps.Marker({
        position: coordinates,
        map: map,
        title: name,
        animation: window.google.maps.Animation.DROP
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0; font-weight: bold;">${name}</h3>
            <p style="margin: 4px 0 0;">${address}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address, name, coordinates]);

  return (
    <Card className="overflow-hidden">
      <div 
        id="restaurant-map" 
        className="w-full h-64 rounded-lg"
        style={{ backgroundColor: '#f0f0f0' }}
      />
    </Card>
  );
};

export default RestaurantMap;