import { getCoordinates } from './geolocation.js';
import { getWeatherInfo } from './services/weather.js';

async function weeklyWeather() {
	const { latitude, longitude, error } = await getCoordinates();

	if (error) return console.error(error);

	const weatherData = await getWeatherInfo(latitude, longitude, 'forecast');
	if (weatherData.error) return new Error(weatherData.error);
}

export { weeklyWeather };
