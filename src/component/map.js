import React, { Component } from "react";
import io from "socket.io-client";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 23.6838716,
      lng: 73.37194090000003,
    };
  }

  componentDidMount() {
    // Initialize the socket connection to the server
    const socket = io("http://localhost:5000");

    // Simulate location updates (replace with actual GPS data)
    setInterval(() => {
      const newLat = this.state.lat + 0.001;
      const newLng = this.state.lng + 0.001;
      this.setState({ lat: newLat, lng: newLng });

      // Emit the location update to the server
      socket.emit("locationUpdate", { lat: newLat, lng: newLng });
    }, 5000);

    // Initialize Google Maps here (refer to the Google Maps API documentation)
  }

  render() {
    return (
      <div>
        <h1>Real-time GPS Tracking</h1>
        <div id="map" style={{ height: "500px" }}></div>
        <p>Latitude: {this.state.lat}</p>
        <p>Longitude: {this.state.lng}</p>
      </div>
    );
  }
}

export default Map;
