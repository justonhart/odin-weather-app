import WeatherApiCurrent from './WeatherApiCurrent';
import WeatherApiLocation from './WeatherApiLocation';

export default interface WeatherApiRealtimeResponse {
	location: WeatherApiLocation;
	current: WeatherApiCurrent;
}
