import axios from 'axios';
import {SelectedCountry} from "../core/models/SelectedCountryDto.ts";

// Each Country Details acc to selected country name
export const getCountryDetails = async (countryName: string): Promise<SelectedCountry>  => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        return response.data[0];
    } catch (err) {
        console.error("Error fetching country details", err);
    }
}

// Each Flag Png acc to selected country name
export const getFlag = async (countryName: string) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        return response.data[0].flags.png;
    } catch (err) {
        return '';
    }
};
