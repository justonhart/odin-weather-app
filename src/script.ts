import './style.css';
import WeatherApiForecastResponse from './types/WeatherApiForecastResponse';

//obviously, storing keys in source control is bad practice, but the prompt says to just do it
const API_KEY = 'e8a8d88b693443a8b06172319241706';

const LOCATION_FORM = document.getElementById('locationForm');
let lastForecastResponse: WeatherApiForecastResponse;

let useMetric = false;

const RESULTS = document.getElementById('results') as HTMLDivElement;
const LOCATION = document.getElementById('location') as HTMLFormElement;
const CURRENT_TEMP = document.getElementById('currentTemp') as HTMLSpanElement;
const CONDITION_ICON = document.getElementById('conditionIcon') as HTMLImageElement;
const CONDITION_TEXT = document.getElementById('conditionText') as HTMLSpanElement;
const FEELS_LIKE = document.getElementById('feelsLike') as HTMLSpanElement;

LOCATION_FORM.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(event.target as HTMLFormElement);
	getForecast(formData.get('zipcode').toString());
});

function getForecast(zipCode: string) {
	const URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${zipCode}`;
	fetch(URL)
		.then((result) => {
			return result.json();
		})
		.then((response: WeatherApiForecastResponse) => {
			lastForecastResponse = response;
			console.log(lastForecastResponse);
			updateResultsPane(lastForecastResponse);
		});
}

function updateResultsPane(forecastData: WeatherApiForecastResponse) {
	RESULTS.hidden = false;
	LOCATION.innerText = forecastData.location?.name + (!!forecastData.location?.region ? `, ${forecastData.location.region}` : '');
	CONDITION_ICON.src = forecastData.current.condition.icon;
	CONDITION_TEXT.innerText = forecastData.current.condition.text;
	CURRENT_TEMP.innerText = useMetric
		? `${forecastData.current.temp_c.toString()} °C`
		: `${forecastData.current.temp_f.toString()} °F`;
	FEELS_LIKE.innerText = 'Feels like ' + (useMetric
		? `${forecastData.current.feelslike_c.toString()} °C`
		: `${forecastData.current.feelslike_f.toString()} °F`);
}
