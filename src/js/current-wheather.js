import weather from '../assets/data/current-weather.js';
import { formatDate, formatTemp, formatUrl } from './utils/format-data.js';
import { $city, $date, $temp, $app } from './selectors.js';
import { getCoordinates } from './geolocation.js';

async function currentWeather() {
	const { latitude, longitude, error } = await getCoordinates();

	if (error) return console.error(error);

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
	const sunriseTime = new Date(weather.sys.sunrise * 1000).getHours();
	const sunseTime = new Date(weather.sys.sunset * 1000).getHours();

	return currentTime > sunseTime || currentTime < sunriseTime
		? 'night'
		: 'morning';
}

async function setBackground() {
	const code = weather.weather[0].id;
	$app.style.backgroundImage = formatUrl(code, getDayTime());
}

export { currentWeather };
