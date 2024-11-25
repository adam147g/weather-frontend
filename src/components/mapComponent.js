import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom component to handle map clicks and trigger the coordinate update
const ClickEventHandler = ({ onClick }) => {
    useMapEvents({
        click(e) {
            onClick(e.latlng); // Pass the coordinates back to the parent component
        },
    });
    return null;
};

const MapComponent = ({ setCoordinates }) => {
    const [coordinates, setLocalCoordinates] = useState(null); // Local state to store clicked coordinates

    // Handle map click and update the coordinates
    const handleMapClick = (latlng) => {
        setLocalCoordinates(latlng);  // Store coordinates locally
        setCoordinates({ latitude: latlng.lat, longitude: latlng.lng }); // Pass both latitude and longitude to App.js
    };

    const customIcon = new L.Icon({
        iconUrl: '/images/popup-icon.png',
        iconSize: [25, 25],
        iconAnchor: [12, 25], 
        popupAnchor: [0, -41],
    });

    return (
        <div>
            <MapContainer
                center={[51.505, -0.09]} // Default center (can be dynamic)
                zoom={13}
                style={{ height: '400px', width: '100%' }}
            >
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <ClickEventHandler onClick={handleMapClick} />
                {coordinates && (
                    <Marker position={coordinates} icon={customIcon}>
                        <Popup>
                            You clicked at {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>

            
        </div>
    );
};

export default MapComponent;
