import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

const RestaurantDashboardMap = ({ location, onLocationUpdate }) => {
  const [currentLocation, setCurrentLocation] = React.useState(location);
  const [isEditing, setIsEditing] = React.useState(false);
  const mapRef = React.useRef(null);
  const markerRef = React.useRef(null);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById('dashboard-map'), {
        center: currentLocation,
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
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      });

      mapRef.current = map;

      // Create the marker
      const marker = new window.google.maps.Marker({
        position: currentLocation,
        map: map,
        draggable: isEditing,
        animation: window.google.maps.Animation.DROP,
        title: 'Your Restaurant'
      });

      markerRef.current = marker;

      // Add marker drag event
      marker.addListener('dragend', () => {
        const newPosition = {
          lat: marker.getPosition().lat(),
          lng: marker.getPosition().lng()
        };
        setCurrentLocation(newPosition);
        onLocationUpdate && onLocationUpdate(newPosition);
      });

      // Info window with location details
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0; font-weight: bold;">Your Restaurant</h3>
            <p style="margin: 4px 0 0;">Lat: ${currentLocation.lat.toFixed(4)}</p>
            <p style="margin: 4px 0 0;">Lng: ${currentLocation.lng.toFixed(4)}</p>
            ${isEditing ? '<p style="margin: 4px 0 0; color: #DC2626;">Drag marker to update location</p>' : ''}
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
  }, [currentLocation, isEditing, onLocationUpdate]);

  // Update marker draggable state when editing mode changes
  React.useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setDraggable(isEditing);
    }
  }, [isEditing]);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(newLocation);
          if (mapRef.current && markerRef.current) {
            mapRef.current.setCenter(newLocation);
            markerRef.current.setPosition(newLocation);
          }
          onLocationUpdate && onLocationUpdate(newLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Restaurant Location</h3>
          <div className="space-x-2">
            <button
              onClick={handleGetCurrentLocation}
              className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              <Navigation className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1 text-white rounded-md ${
                isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
              }`}
            >
              {isEditing ? 'Save Location' : 'Edit Location'}
            </button>
          </div>
        </div>
      </div>
      <div 
        id="dashboard-map" 
        className="w-full h-[400px]"
        style={{ backgroundColor: '#f0f0f0' }}
      />
    </Card>
  );
};

export default RestaurantDashboardMap;