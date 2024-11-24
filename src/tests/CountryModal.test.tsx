import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryModal from "../core/modals/CountryDetailsDialog.tsx";

const mockCountryData= {
    selectedCountry: {
        name: 'Andorra',
        capital: 'Andorra La Vella',
        population: 77265,
        area: 468,
        languages: { ca: 'Catalan' },
        currencies: [{ name: 'Euro', symbol: '€' }],
        timezones: ['UTC+1'],
        borders: ['France', 'Spain'],
        flags: {
            png: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_Andorra.svg/1920px-Flag_of_Andorra.svg.png',
            alt: 'Flag of Andorra'
        }
    },
    weatherInfo: {
        location: {
            name: "Andorra La Vella",
            region: "Andorra la Vella",
            country: "Andorra",
            lat: 42.5,
            lon: 1.5167,
            tz_id: "Europe/Andorra",
            localtime_epoch: 1732437745,
            localtime: "2024-11-24 09:42"
        },
        current: {
            last_updated_epoch: 1732437000,
            last_updated: "2024-11-24 09:30",
            temp_c: 0.8,
            temp_f: 33.4,
            is_day: 1,
            condition: {
                text: "Mist",
                icon: "//cdn.weatherapi.com/weather/64x64/day/143.png",
                code: 1030
            },
            wind_mph: 5.8,
            wind_kph: 9.4,
            wind_degree: 200,
            wind_dir: "SSW",
            pressure_mb: 1027.0,
            pressure_in: 30.32,
            precip_mm: 0.0,
            precip_in: 0.0,
            humidity: 96,
            cloud: 77,
            feelslike_c: -2.2,
            feelslike_f: 28.1,
            windchill_c: -2.2,
            windchill_f: 28.1,
            heatindex_c: 0.8,
            heatindex_f: 33.4,
            dewpoint_c: 0.2,
            dewpoint_f: 32.4,
            vis_km: 2.0,
            vis_miles: 1.0,
            uv: 0.1,
            gust_mph: 11.9,
            gust_kph: 19.2
        }
    }
};


// Test for CountryModal component
describe('CountryModal Component', () => {
    test('renders country data correctly', () => {
        render(<CountryModal isOpen={true} closeModal={jest.fn()} countryData={mockCountryData} />);

        const closeButton = screen.getByRole('button', { name: /Close/i });
        expect(closeButton).toBeInTheDocument();
    });
});
