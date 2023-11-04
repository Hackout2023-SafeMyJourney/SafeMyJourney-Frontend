import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Polyline,
  Marker,
} from "google-maps-react-18-support";

class LiveTraking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: "",
      destination: "",
      sourceLocation: null,
      destinationLocation: null,
      path: [],
      mapCenter: { lat: 18.5167, lng: 73.8561 },
      currentPosition: null,
      watchId: null,
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.setState({ currentPosition: currentLocation });

          if (this.state.sourceLocation) {
            this.updatePath(this.state.sourceLocation, currentLocation);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );

      this.setState({ watchId });
    }
  }

  componentWillUnmount() {
    if (this.state.watchId) {
      navigator.geolocation.clearWatch(this.state.watchId);
    }
  }

  handleAutoComplete = (field) => (e) => {
    const value = e.target.value;
    this.setState({ [field]: value });

    if (value.trim() === "") {
      this.setState({ [`${field}Location`]: null });
      return;
    }

    const autoCompleteService =
      new window.google.maps.places.AutocompleteService();
    autoCompleteService.getPlacePredictions(
      { input: value },
      (predictions, status) => {
        if (status === "OK" && predictions.length > 0) {
          this.setState({
            [`${field}Predictions`]: predictions,
          });
        } else {
          this.setState({ [`${field}Predictions`]: [] });
        }
      }
    );

    if (field === "source" || field === "destination") {
      if (this.state.watchId) {
        navigator.geolocation.clearWatch(this.state.watchId);
        this.setState({ watchId: null });
      }
    }
  };

  selectPrediction = (field, prediction) => {
    this.setState({ [field]: prediction.description });
    this.setState({ [`${field}Predictions`]: [] });

    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    placesService.getDetails({ placeId: prediction.place_id }, (place) => {
      this.setState({ [`${field}Location`]: place.geometry.location });
    });
  };

  useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: currentLocation }, (results, status) => {
          if (status === "OK" && results[0]) {
            this.setState({
              source: results[0].formatted_address,
              sourceLocation: currentLocation,
            });
          } else {
            console.error("Error fetching current location:", status);
          }
        });
      });
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  handleGetDirections = () => {
    const { source, destination } = this.state;

    if (source && destination) {
      this.getDirections(source, destination);

      if (this.state.sourceLocation) {
        this.setState({ mapCenter: this.state.sourceLocation });
      }
    } else {
      console.error("Source and destination addresses are required.");
    }
  };

  getDirections = (source, destination) => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const path = result.routes[0].overview_path;
          this.setState({ path });
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  updatePath = (source, currentLocation) => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: source,
        destination: currentLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const path = result.routes[0].overview_path;
          this.setState({ path });
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  render() {
    const {
      source,
      destination,
      sourcePredictions,
      destinationPredictions,
      currentPosition,
    } = this.state;

    return (
      <div style={{ width: "100%", height: "100%"}}>
        <div className="flex flex-col p-5 items-center">
          <div>
            <div className="flex flex-row">
              <input
                type="text"
                value={source}
                onChange={this.handleAutoComplete("source")}
                style={{
                  borderRadius: "15px",
                  border: "1px solid black",
                  padding: "5px",
                  width: "70vw"
                }}
                placeholder="Source Address"
              />
              <button onClick={this.useCurrentLocation}
                style={{
                  borderRadius: "15px",
                  border: "1px solid black",
                  padding: "5px",
                  width: "20vw",
                }}>
                Current Location
              </button>
            </div>
            <ul style={{
                  width: "100%"
            }}>
              {sourcePredictions &&
                sourcePredictions.map((prediction) => (
                  <li
                    key={prediction.place_id}
                    onClick={() => this.selectPrediction("source", prediction)}
                  >
                    {prediction.description}
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              value={destination}
              onChange={this.handleAutoComplete("destination")}
              style={{
                borderRadius: "15px",
                border: "1px solid black",
                padding: "5px",
                width: "90vw",
                height: "50px",
              }}
              placeholder="Destination Address"
            />
            <ul>
              {destinationPredictions &&
                destinationPredictions.map((prediction) => (
                  <li
                    key={prediction.place_id}
                    onClick={() =>
                      this.selectPrediction("destination", prediction)
                    }
                  >
                    {prediction.description}
                  </li>
                ))}
            </ul>
          </div>
          <button onClick={this.handleGetDirections} 
            style={{
              borderRadius: "15px",
              border: "1px solid black",
              padding: "5px",
              width: "30vw",
              height: "50px",
            }}>
              Get Directions
            </button>
        </div>
        <Map
          google={this.props.google}
          zoom={10}
          initialCenter={this.state.mapCenter}
        >
          {this.state.sourceLocation && (
            <Marker
              position={this.state.sourceLocation}
              name="Source"
              title="Source"
            />
          )}
          {this.state.destinationLocation && (
            <Marker
              position={this.state.destinationLocation}
              name="Destination"
              title="Destination"
            />
          )}
          {currentPosition && (
            <Marker
              position={currentPosition}
              name="Current Location"
              title="Current Location"
            />
          )}
          <Polyline
            path={this.state.path}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_MAPS_KEY}`,
})(LiveTraking);
