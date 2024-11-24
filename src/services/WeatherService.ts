import axios from 'axios';
import {WeatherInfo} from "../core/models/WeatherInfoDto.ts";

// getWeather works async so below service is calling in this way.
export const getWeather = async (capital: string): Promise<WeatherInfo | null> => {
    const apiKey = '231349aa57cf4a7f92e91130242211';  // WeatherAPI API key
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data && data.current) {
            return {
                location: {
                    name: data.location.name,
                    region: data.location.region,
                    country: data.location.country,
                    lat: data.location.lat,
                    lon: data.location.lon,
                    tz_id: data.location.tz_id,
                    localtime_epoch: data.location.localtime_epoch,
                    localtime: data.location.localtime
                },
                current: {
                    last_updated_epoch: data.current.last_updated_epoch,
                    last_updated: data.current.last_updated,
                    temp_c: data.current.temp_c,
                    temp_f: data.current.temp_f,
                    is_day: data.current.is_day,
                    condition: {
                        text: data.current.condition.text,
                        icon: `http:${data.current.condition.icon}`,
                        code: data.current.condition.code
                    },
                    wind_mph: data.current.wind_mph,
                    wind_kph: data.current.wind_kph,
                    wind_degree: data.current.wind_degree,
                    wind_dir: data.current.wind_dir,
                    pressure_mb: data.current.pressure_mb,
                    pressure_in: data.current.pressure_in,
                    precip_mm: data.current.precip_mm,
                    precip_in: data.current.precip_in,
                    humidity: data.current.humidity,
                    cloud: data.current.cloud,
                    feelslike_c: data.current.feelslike_c,
                    feelslike_f: data.current.feelslike_f,
                    windchill_c: data.current.windchill_c,
                    windchill_f: data.current.windchill_f,
                    heatindex_c: data.current.heatindex_c,
                    heatindex_f: data.current.heatindex_f,
                    dewpoint_c: data.current.dewpoint_c,
                    dewpoint_f: data.current.dewpoint_f,
                    vis_km: data.current.vis_km,
                    vis_miles: data.current.vis_miles,
                    uv: data.current.uv,
                    gust_mph: data.current.gust_mph,
                    gust_kph: data.current.gust_kph
                }
            };
        }
        return null;
};
