import WeatherApiCondition from './WeatherApiCondition';

export default interface WeatherApiDay {
	maxtemp_c: number;
	maxtemp_f: number;
	mintemp_c: number;
	mintemp_f: number;
	avgtemp_c: number;
	avgtemp_f: number;
	maxwind_mph: number;
	maxwind_kph: number;
	totalprecip_mm: number;
	totalprecip_in: number;
	totalsnow_cm: number;
	avgvis_km: number;
	avgvis_miles: number;
	avghumidity: number;
	condition: WeatherApiCondition;
	uv: number;
	daily_will_it_rain: number;
	daily_will_it_snow: number;
	daily_chance_of_rain: number;
	daily_chance_of_snow: number;
}