import {SelectedCountry} from "./SelectedCountryDto.ts";
import {WeatherInfo} from "./WeatherInfoDto.ts";

export class CountryData {
    selectedCountry: SelectedCountry | null;
    weatherInfo: WeatherInfo | null;
};

export class CountryGeneralData {
    name: string;
    capital: string;
    awsRegion: string;
    flags?: any;
    languagesField?: any;
}

export class CountryMapProps {
    lat: number;
    lon: number;
    weatherInfo?: WeatherInfo;
}
