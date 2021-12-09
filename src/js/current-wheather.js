import weather from '../assets/data/current-weather.js';
import { formatDate, formatTemp, formatUrl } from './utils/format-data.js';
import { $city, $date, $temp, $app } from './selectors.js';

function currentWeather() {
	configCurrentWeather(weather);
	setBackground();
}

function printWeatherInfo(element, data) {
	element.textContent = data;
}

function configCurrentWeather({ name, main: { temp } }) {
	printWeatherInfo($city, name);
	printWeatherInfo($date, formatDate(new Date()));
	printWeatherInfo($temp, formatTemp(temp));
}

function getDayTime() {
	const currentTime = new Date().getHours();
	const sunriseTime = new Date(weather.sys.sunrise).getHours();
	const sunseTime = new Date(weather.sys.sunset).getHours();

	return currentTime > sunseTime || currentTime < sunriseTime
		? 'night'
		: 'morning';
}

function setBackground() {
	const code = weather.weather[0].id;
	$app.style.backgroundImage = formatUrl(code, getDayTime());
}

export { currentWeather };
