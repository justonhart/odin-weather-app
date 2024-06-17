import './style.css';
import WeatherApiRealtimeResponse from './types/WeatherApiRealtimeResponse';

//obviously, storing keys in source control is bad practice, but the prompt says to just do it
const API_KEY = 'e8a8d88b693443a8b06172319241706';
const locationForm = document.getElementById('locationForm');
let lastForecastResponse: WeatherApiRealtimeResponse;

locationForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(event.target as HTMLFormElement);
	getForecast(formData.get('zipcode').toString());
});

async function getForecast(zipCode: string) {
	const URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${zipCode}`;
	fetch(URL)
		.then((result) => {
			return result.json();
		})
		.then((response: WeatherApiRealtimeResponse) => {
			lastForecastResponse = response;
			console.log(lastForecastResponse);
		});
}
