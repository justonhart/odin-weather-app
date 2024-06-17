import WeatherApiDay from './WeatherApiDay';
import WeatherApiAstro from './WeatherApiAstro';
import WeatherApiHour from './WeatherApiHour';

export default interface WeatherApiForecastDay {
	day: WeatherApiDay;
	astro: WeatherApiAstro;
	hour: WeatherApiHour[];
}
