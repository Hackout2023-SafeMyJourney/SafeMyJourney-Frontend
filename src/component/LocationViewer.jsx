import React, { useEffect } from "react";
import { useState } from "react";
import {
	Map,
	GoogleApiWrapper,
	Polyline,
	Marker,
} from "google-maps-react-18-support";

const LocationViewer = (props) => {
	const [data, setData] = useState({
		source: "",
		destination: "",
		sourceLocation: null,
		destinationLocation: null,
		path: [],
		mapCenter: { lat: 18.5167, lng: 73.8561 },
		currentPosition: null,
		watchId: null,
	});

	const handleSetData = (name, value) => {
		setData((prev) => {
			return {
				...prev,
				[name]: value,
			}
		})
	}

	useEffect(() => {
		if (navigator.geolocation) {
			const watchId = navigator.geolocation.watchPosition(
				(position) => {
					const currentLocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					handleSetData("currentPosition", currentLocation);

					if (data.sourceLocation) {
						updatePath(data.sourceLocation, currentLocation);
					}
				}, (error) => {
					console.error("Error getting current location:", error);
				}
			);
			handleSetData("watchId", watchId);
		}
	},[]);

	useEffect(() => {
		return (() => {
			if (data.watchId) {
				navigator.geolocation.clearWatch(data.watchId);
			}
		});
	}, []);

	const handleAutoComplete = (field) => (e) => {
		const value = e.target.value;
		handleSetData(field, value);

		if (value.trim() === "") {
			handleSetData(`${field}Location`, null);
			return;
		}

		const autoCompleteService = new window.google.maps.places.AutocompleteService();
		autoCompleteService.getPlacePredictions(
			{ input: value },
			(predictions, status) => {
				if (status === "OK" && predictions.length > 0) {
					handleSetData(`${field}Predictions`, predictions);
				} else {
					handleSetData(`${field}Predictions`, []);
				}
			}
		);

		if (field === "source" || field === "destination") {
			if (data.watchId) {
				navigator.geolocation.clearWatch(data.watchId);
				handleSetData("watchId", null);
			}
		}
	};

	const selectPrediction = (field, prediction) => {
		handleSetData(field, prediction.description);
		handleSetData(`${field}Predictions`, []);

		const placesService = new window.google.maps.places.PlacesService(
			document.createElement("div")
		);
		placesService.getDetails({ placeId: prediction.place_id }, (place) => {
			handleSetData(`${field}Location`, place.geometry.location);
		});
	};

	const useCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const currentLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				const geocoder = new window.google.maps.Geocoder();
				geocoder.geocode({ location: currentLocation }, (results, status) => {
					if (status === "OK" && results[0]) {
						handleSetData("source", results[0].formatted_address);
						handleSetData("sourceLocation", currentLocation);
					} else {
						console.error("Error fetching current location:", status);
					}
				});
			});
		} else {
			console.error("Geolocation is not supported by your browser.");
		}
  	};

	const handleGetDirections = () => {
		const { source, destination } = data;

		if (source && destination) {
			getDirections(source, destination);
			if (data.sourceLocation) {
				handleSetData("mapCenter", data.sourceLocation);
			}
		} else {
			console.error("Source and destination addresses are required.");
		}
	};

	const getDirections = (source, destination) => {
		const DirectionsService = new window.google.maps.DirectionsService();

		DirectionsService.route(
			{
				origin: source,
				destination: destination,
				travelMode: window.google.maps.TravelMode.DRIVING,
			}, (result, status) => {
				if (status === window.google.maps.DirectionsStatus.OK) {
					const path = result.routes[0].overview_path;
					handleSetData("path", path);
				} else {
					console.error("Error fetching directions:", status);
				}
			}
		);
	};

	const updatePath = (source, currentLocation) => {
		const DirectionsService = new window.google.maps.DirectionsService();

		DirectionsService.route(
			{
				origin: source,
				destination: currentLocation,
				travelMode: window.google.maps.TravelMode.DRIVING,
			}, (result, status) => {
				if (status === window.google.maps.DirectionsStatus.OK) {
					const path = result.routes[0].overview_path;
					handleSetData("path", path);
				} else {
					console.error("Error fetching directions:", status);
				}
			}
		);
	};

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<div className="flex flex-col p-5 items-center">
				<div>
					<div className="flex flex-row">
						<input
							type="text"
							value={data.source}
							onChange={handleAutoComplete("source")}
							style={{
								borderRadius: "15px",
								border: "1px solid black",
								padding: "5px",
								width: "70vw",
							}}
							placeholder="Source Address"
						/>
						<button
							onClick={useCurrentLocation}
							style={{
								borderRadius: "15px",
								border: "1px solid black",
								padding: "5px",
								width: "20vw",
							}}
						>
							Current Location
						</button>
					</div>
					<ul
					style={{
						width: "100%",
					}}
					>
						{data.sourcePredictions &&
							data.sourcePredictions.map((prediction) => (
							<li
								key={prediction.place_id}
								onClick={() => selectPrediction("source", prediction)}
							>
								{prediction.description}
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col">
					<input
						type="text"
						value={data.destination}
						onChange={handleAutoComplete("destination")}
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
					{data.destinationPredictions &&
						data.destinationPredictions.map((prediction) => (
						<li
							key={prediction.place_id}
							onClick={() =>
								selectPrediction("destination", prediction)
							}
						>
							{prediction.description}
						</li>
						))}
					</ul>
				</div>
				<button
					onClick={handleGetDirections}
					style={{
						borderRadius: "15px",
						border: "1px solid black",
						padding: "5px",
						width: "30vw",
						height: "50px",
					}}
				>
					Get Directions
				</button>
			</div>
			<Map
				google={props.google}
				zoom={10}
				initialCenter={data.mapCenter}
			>
				{data.sourceLocation && (
					<Marker
						position={data.sourceLocation}
						name="Source"
						title="Source"
					/>
				)}
				{data.destinationLocation && (
					<Marker
						position={data.destinationLocation}
						name="Destination"
						title="Destination"
					/>
				)}
				{data.currentPosition && (
					<Marker
						position={data.currentPosition}
						name="Current Location"
						title="Current Location"
					/>
				)}
				<Polyline
					path={data.path}
					strokeColor="#0000FF"
					strokeOpacity={0.8}
					strokeWeight={2}
				/>
			</Map>
		</div>
	);
}

export default GoogleApiWrapper({
	apiKey: `${process.env.REACT_APP_MAPS_KEY}`,
})(LocationViewer);