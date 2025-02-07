import React from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const RestaurantsMap = ({ restaurants }) => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Initialize map centered on Kathmandu
      const map = new window.google.maps.Map(document.getElementById('restaurants-map'), {
        center: { lat: 27.7172, lng: 85.3240 },
        zoom: 13,
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

      // Create bounds to fit all markers
      const bounds = new window.google.maps.LatLngBounds();
      
      // Add markers for each restaurant
      restaurants.forEach(restaurant => {
        const position = {
          lat: restaurant.coordinates.lat,
          lng: restaurant.coordinates.lng
        };
        
        const marker = new window.google.maps.Marker({
          position,
          map,
          title: restaurant.name,
          animation: window.google.maps.Animation.DROP
        });

        // Extend bounds to include this marker
        bounds.extend(position);

        // Create info window with restaurant details
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <div style="margin-bottom: 8px;">
                <img src="${restaurant.image}" alt="${restaurant.name}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 4px;">
              </div>
              <h3 style="margin: 0; font-weight: bold;">${restaurant.name}</h3>
              <p style="margin: 4px 0 0;">${restaurant.location}</p>
              <button 
                onclick="window.location.href='/restaurant/${restaurant.id}'"
                style="background: #DC2626; color: white; padding: 4px 8px; border-radius: 4px; border: none; margin-top: 8px; cursor: pointer;"
              >
                View Details
              </button>
            </div>
          `
        });

        // Add click listener to marker
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      // Fit map to show all markers if there are any
      if (restaurants.length > 0) {
        map.fitBounds(bounds);
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [restaurants, navigate]);

  return (
    <Card className="overflow-hidden">
      <div 
        id="restaurants-map" 
        className="w-full h-[400px] rounded-lg"
        style={{ backgroundColor: '#f0f0f0' }}
      />
    </Card>
  );
};

export default RestaurantsMap;