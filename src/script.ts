import './style.css';
import DomManipulator from './DomManipulator';
import WeatherApiForecastResponse from './types/WeatherApiForecastResponse';

//obviously, storing keys in source control is bad practice, but the prompt says to just do it
const API_KEY = 'e8a8d88b693443a8b06172319241706';

const LOCATION_FORM = document.getElementById('locationForm');
let lastForecastResponse: WeatherApiForecastResponse;

let useMetric = false;

const RESULTS_CARD = document.getElementById('resultsCard') as HTMLDivElement;
const dm = new DomManipulator(RESULTS_CARD, useMetric);

LOCATION_FORM.addEventListener('submit', async (event) => {
	event.preventDefault();
	dm.setLoading();
	const formData = new FormData(event.target as HTMLFormElement);
	
	lastForecastResponse = await getForecast(formData.get('zipcode').toString());
	dm.setResults(lastForecastResponse);
});

async function getForecast(zipCode: string): Promise<WeatherApiForecastResponse> {
	const URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${zipCode}`;
	return fetch(URL)
		.then((result) => {
			return result.json();
		})
		.then((response: WeatherApiForecastResponse) => {
			return response;
		});
}

