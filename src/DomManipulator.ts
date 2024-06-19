import WeatherApiForecastResponse from './types/WeatherApiForecastResponse';
import WeatherApiHour from './types/WeatherApiHour';

export default class DomManipulator {
	private resultsElement: HTMLDivElement;
	private hourlyForecastElement: HTMLDivElement;
	private useMetric: boolean;
	constructor() {
		this.resultsElement = document.getElementById(
			'results',
		) as HTMLDivElement;
		this.hourlyForecastElement = document.getElementById(
			'hourlyForecast',
		) as HTMLDivElement;
		this.useMetric = false;
	}

	public setLoading(): void {
		this.resultsElement.classList.remove('hidden');
		this.resultsElement.innerHTML = '';
		this.resultsElement.innerText = 'Loading results...';

		this.hourlyForecastElement.innerHTML = '';
		this.hourlyForecastElement.classList.add('hidden');
	}

	public setResults(result: WeatherApiForecastResponse): void {
		this.resultsElement.innerHTML = '';
		const location = document.createElement('h2');
		location.innerText =
			result.location.region != undefined
				? `${result.location.name}, ${result.location.region}`
				: result.location.name;
		this.resultsElement.appendChild(location);

		const conditions = document.createElement('div');
		conditions.id = 'conditions';
		conditions.classList.add('vertical-center');
		this.resultsElement.appendChild(conditions);

		const icon = document.createElement('img');
		icon.src = result.current.condition.icon;
		conditions.appendChild(icon);

		const conditionText = document.createElement('span');
		conditionText.innerText = `${result.current.condition.text} - ${this.useMetric ? result.current.temp_c + ' °C' : result.current.temp_f + ' °F'}`;
		conditions.appendChild(conditionText);

		const feelsLike = document.createElement('span');
		feelsLike.id = 'feelsLike';
		feelsLike.innerText = `Feels like ${this.useMetric ? result.current.feelslike_c + ' °C' : result.current.feelslike_f + ' °F'}`;
		this.resultsElement.appendChild(feelsLike);
	}

	public setHourly(result: WeatherApiForecastResponse): void {
		this.hourlyForecastElement.innerHTML = '';
		this.hourlyForecastElement.classList.remove('hidden');

		const hourlyHeader = document.createElement('h2');
		hourlyHeader.innerText = 'Hourly Forecast';
		this.hourlyForecastElement.appendChild(hourlyHeader);

		const chipContainer = document.createElement('div');
		chipContainer.classList.add('chipContainer');
		this.hourlyForecastElement.appendChild(chipContainer);

		result.forecast.forecastday[0].hour.forEach((hour: WeatherApiHour) => {
			const chip = this.createHourChip(hour);
			chipContainer.appendChild(chip);
		});
	}

	private createHourChip(hour: WeatherApiHour): HTMLDivElement {
		const chip = document.createElement('div');
		chip.classList.add('hourChip');

		const time = document.createElement('strong');
		time.innerText = hour.time.substring(
			hour.time.indexOf(' '),
			hour.time.length,
		);
		chip.appendChild(time);

		const icon = document.createElement('img');
		icon.src = hour.condition.icon;
		chip.appendChild(icon);

		const temp = document.createElement('span');
		temp.innerText = this.useMetric
			? hour.temp_c + ' °C'
			: hour.temp_f + ' °F';
		chip.appendChild(temp);
		return chip;
	}
}
