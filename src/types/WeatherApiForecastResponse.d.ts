import WeatherApiCurrent from './WeatherApiCurrent';
import WeatherApiForecast from './WeatherApiForecast';
import WeatherApiLocation from './WeatherApiLocation';

export default interface WeatherApiForecastResponse {
	current: WeatherApiCurrent;
	forecast: WeatherApiForecast;
	location: WeatherApiLocation;
}
