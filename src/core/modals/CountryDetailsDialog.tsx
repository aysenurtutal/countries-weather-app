import React from 'react';
import Modal from 'react-modal';
import { Button } from 'primereact/button';
import CountryMap from '../../components/CountryMap.tsx';
import {CountryData} from "../models/CountryDataDto.ts";
import Styles from '../../components/country.module.css'
import {useLocation, useParams} from "react-router-dom";
import {customStyles} from "../utils/helpers.ts";

Modal.setAppElement('#root');

const CountryModal: React.FC<{ isOpen: boolean, closeModal: () => void, countryData: CountryData | null }> = ({ isOpen, closeModal, countryData }) => {

    const { name } = useParams<{ name: string }>();
    const location = useLocation();
    const newPathCountryData = location.state?.countryData; // share country data with state when routing to path

    // to receive data from modal or path
    const { selectedCountry, weatherInfo } = name ? newPathCountryData || {} : countryData || {};

    // controlling routing to modal or path with name parameter
    const isPath = !!name;

    if (isPath) {
        return (
            <>
                <div className="pb-2 d-flex gap-10 justify-content-center" style={{ gap: '10px' }}>
                    <img
                        src={selectedCountry?.flags.png}
                        style={{ width: '40px', borderRadius: '5px' }}
                    />
                    <h3 style={{ margin: 0 }}>{selectedCountry?.name?.common} Details</h3>
                </div>

                {/* Map */}
                {weatherInfo?.location?.lat && weatherInfo?.location?.lon ? (
                    <CountryMap lat={weatherInfo?.location?.lat} lon={weatherInfo?.location?.lon} weatherInfo={weatherInfo} />
                ) : (
                    <p>Location data not available.</p>
                )}

                {/* Country Info */}
                <div className={Styles.modalContainer}>
                    <div className={Styles.modalCountryInfo}>
                        {selectedCountry?.name?.common && (
                            <h5 style={{ margin: 0 }}>{selectedCountry?.name?.common}</h5>
                        )}
                        <div className={Styles.countryInfo}>
                            <ul>
                                <li>Population: {selectedCountry?.population}</li>
                                <li>Area: {selectedCountry?.area} km²</li>
                                <li>Languages:
                                    {selectedCountry.languages && Object.keys(selectedCountry.languages).length > 0
                                        ? Object.values(selectedCountry.languages).map((language, index) => (
                                            <div key={`language-${language}-${index}`}>{language}</div>
                                        ))
                                        : 'N/A'}
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    Currencies: {selectedCountry?.currencies && Object.keys(selectedCountry.currencies).length > 0
                                    ? Object.keys(selectedCountry.currencies).map((currencyCode) => (
                                        <span key={`currency-${currencyCode}`}>{selectedCountry.currencies[currencyCode].name} ({selectedCountry.currencies[currencyCode].symbol})</span>
                                    ))
                                    : 'N/A'}
                                </li>

                                <li>Timezones: {selectedCountry?.timezones ? selectedCountry.timezones.join(", ") : 'N/A'}</li>
                                <li>Borders: {selectedCountry?.borders ? selectedCountry.borders.join(", ") : 'None'}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Weather Situation of The Capital */}
                    <div className={Styles.modalWeatherInfo}>
                        {selectedCountry?.capital && (
                            <h5>Weather in {selectedCountry?.capital}</h5>
                        )}
                        {weatherInfo && weatherInfo.current.condition.icon && (
                            <>
                                <img src={weatherInfo.current.condition.icon} alt={weatherInfo.current.condition.text}
                                     className={Styles.modalWeatherIcon} />
                                <p>Temperature: {weatherInfo.current.temp_c}°C</p>
                                <p>Weather: {weatherInfo.current.condition.text}</p>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className="pb-2 d-flex gap-10 justify-content-center" style={{ gap: '10px' }}>
                <img
                    src={selectedCountry?.flags.png}
                    style={{ width: '40px', borderRadius: '5px' }}
                />
                <h3 style={{ margin: 0 }}>{selectedCountry?.name?.common} Details</h3>
            </div>

            {/* Map */}
            {weatherInfo?.location?.lat && weatherInfo?.location?.lon ? (
                <CountryMap lat={weatherInfo?.location?.lat} lon={weatherInfo?.location?.lon} weatherInfo={weatherInfo} />
            ) : (
                <p>Location data not available.</p>
            )}

            {/* Country Info */}
            <div className={Styles.modalContainer}>
                <div className={Styles.modalCountryInfo}>
                    {selectedCountry?.name?.common && (
                        <h5 style={{ margin: 0 }}>{selectedCountry?.name?.common}</h5>
                    )}
                    <div className={Styles.countryInfo}>
                        <ul>
                            <li>Population: {selectedCountry?.population}</li>
                            <li>Area: {selectedCountry?.area} km²</li>
                            <li>Languages:
                                {selectedCountry.languages && Object.keys(selectedCountry.languages).length > 0
                                    ? Object.values(selectedCountry.languages).map((language, index) => (
                                        <div key={`language-${language}-${index}`}>{language}</div>
                                    ))
                                    : 'N/A'}
                            </li>
                        </ul>
                        <ul>
                            <li>
                                Currencies: {selectedCountry?.currencies && Object.keys(selectedCountry.currencies).length > 0
                                ? Object.keys(selectedCountry.currencies).map((currencyCode) => (
                                    <span key={`currency-${currencyCode}`}>{selectedCountry.currencies[currencyCode].name} ({selectedCountry.currencies[currencyCode].symbol})</span>
                                ))
                                : 'N/A'}
                            </li>


                            <li>Timezones: {selectedCountry?.timezones ? selectedCountry.timezones.join(", ") : 'N/A'}</li>
                            <li>Borders: {selectedCountry?.borders ? selectedCountry.borders.join(", ") : 'None'}</li>
                        </ul>
                    </div>
                </div>

                {/* Weather Situation of The Capital */}
                <div className={Styles.modalWeatherInfo}>
                    {selectedCountry?.capital && (
                        <h5>Weather in {selectedCountry?.capital}</h5>
                    )}
                    {weatherInfo && weatherInfo.current.condition.icon && (
                        <>
                            <img src={weatherInfo.current.condition.icon} alt={weatherInfo.current.condition.text}
                                 className={Styles.modalWeatherIcon} />
                            <p>Temperature: {weatherInfo.current.temp_c}°C</p>
                            <p>Weather: {weatherInfo.current.condition.text}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className={Styles.modalFooterButton}>
                {!isPath && (
                    <Button label="Close" icon="pi pi-times" onClick={closeModal} />
                )}
            </div>
        </Modal>
    );
};

export default CountryModal;
