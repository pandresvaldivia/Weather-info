import { formatDate, formatTemp, formatUrl } from './utils/format-data.js';
import { $city, $date, $temp, $app, $loader } from './selectors.js';
import { getCoordinates } from './geolocation.js';
import { getWeatherInfo } from './services/weather.js';

async function currentWeather() {
	const { latitude, longitude, error } = await getCoordinates();

	if (error) return console.error(error);

	const weatherData = await getWeatherInfo(latitude, longitude);

	if (weatherData.error) return new Error(weatherData.error);

	setBackground(weatherData);
	configCurrentWeather(weatherData);
}

function printWeatherInfo(element, data) {
	element.textContent = data;
}

function configCurrentWeather({ name, main: { temp } }) {
	printWeatherInfo($city, name);
	printWeatherInfo($date, formatDate(new Date()));
	printWeatherInfo($temp, formatTemp(temp));
	showInfo($app, $loader);
}

function getDayTime({ sunrise, sunset }) {
	const currentTime = new Date().getHours();
	const sunriseTime = new Date(sunrise * 1000).getHours();
	const sunseTime = new Date(sunset * 1000).getHours();

	return currentTime > sunseTime || currentTime < sunriseTime
		? 'night'
		: 'morning';
}

async function setBackground({ weather, sys }) {
	const code = weather[0].id;
	$app.style.backgroundImage = formatUrl(code, getDayTime(sys));
}

function showInfo(app, loading) {
	loading.hidden = true;
	app.hidden = false;
}

export { currentWeather };
