import weather from '../assets/data/current-weather.js';
import { formatDate, formatTemp } from './utils/format-data.js';
import { $city, $date, $temp } from './selectors.js';

function currentWeather() {
	configCurrentWeather(weather);
}

function printWeatherInfo(element, data) {
	element.textContent = data;
}

function configCurrentWeather({ name, main: { temp } }) {
	printWeatherInfo($city, name);
	printWeatherInfo($date, formatDate(new Date()));
	printWeatherInfo($temp, formatTemp(temp));
}

export { currentWeather };
