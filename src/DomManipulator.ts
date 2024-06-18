import WeatherApiForecastResponse from "./types/WeatherApiForecastResponse";

export default class DomManipulator {
	private resultsElement: HTMLDivElement;
	private useMetric: boolean;
	constructor (resultsElement: HTMLDivElement, useMetric: boolean) {
		this.resultsElement = resultsElement;
		this.useMetric = useMetric;
	}

	public setLoading(): void {
		this.resultsElement.hidden = false;
		this.resultsElement.innerHTML = '';
		this.resultsElement.innerText = 'Loading results...';
	}

	public setResults(result: WeatherApiForecastResponse): void {
		this.resultsElement.innerHTML = '';
		const location = document.createElement('h2');
		location.innerText = result.location.region != undefined
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
		conditionText.innerText = `${result.current.condition.text} - ${ this.useMetric ? result.current.temp_c + ' °C' : result.current.temp_f + ' °F'}`;
		conditions.appendChild(conditionText);

		const feelsLike = document.createElement('span');
		feelsLike.id = 'feelsLike';
		feelsLike.innerText = `Feels like ${ this.useMetric ? result.current.feelslike_c + ' °C' : result.current.feelslike_f + ' °F' }`;
		this.resultsElement.appendChild(feelsLike);
	}
}
