import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react-18-support";

const GoogleMapComponent = (props) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  const handleGetCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleGetCurrentLocation}>Get Current Location</button>
      {userLocation && (
        <Map
          google={props.google}
          initialCenter={userLocation}
          center={userLocation}
          zoom={15}
        >
          <Marker position={userLocation} />
        </Map>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_MAPS_KEY}`,
})(GoogleMapComponent);
