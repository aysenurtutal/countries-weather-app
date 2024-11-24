import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {CountryMapProps} from "../core/models/CountryDataDto.ts";
import Styles from "./country.module.css"

const CountryMap: React.FC<CountryMapProps> = ({ lat, lon, weatherInfo }) => {
    const markerRef = useRef<L.Marker<any>>(null);

    // useEffect(() => {
    //     // Automatically open the popup on initial render
    //     if (markerRef.current) {
    //         markerRef.current.openPopup();
    //     }
    // }, []);

    return (
        <MapContainer
            center={[lat, lon]}
            zoom={5}
            className={Styles.leafletContainer}
            style={{ borderRadius: '8px', margin: '10px 0' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lon]} ref={markerRef}>
                {/*adding location icon, weather info can be shown here too*/}
                <Popup autoPan={false} closeButton={true} closeOnClick={true} autoClose={true}>
                    <div style={{ textAlign: 'center', display: 'inline-flex' }}>
                        {weatherInfo ? (
                            <>
                                {weatherInfo.current.condition.icon && (
                                    <img
                                        src={weatherInfo.current.condition.icon}
                                        alt={weatherInfo.current.condition.text}
                                        style={{ width: '50px' }}
                                    />
                                )}
                                <p style={{ paddingRight: '10px'}}>{weatherInfo.current.temp_c}°C</p>
                                <p> {weatherInfo.current.condition.text}</p>
                            </>
                        ) : (
                            <p>No weather info available.</p>
                        )}
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default CountryMap;
