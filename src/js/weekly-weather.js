import { getCoordinates } from './geolocation.js';
import { getWeatherInfo } from './services/weather.js';

async function weeklyWeather() {
	const { latitude, longitude, error } = await getCoordinates();

	if (error) return console.error(error);

	const weatherData = await getWeatherInfo(latitude, longitude, 'forecast');

	if (weatherData.error) return new Error(weatherData.error);
	console.log(formatWeekList(weatherData.list));
}

function formatWeekList(rawData) {
	const weekList = [];
	let dayList = [];

	rawData.forEach((dayHour, index) => {
		dayList.push(dayHour);

		if ((index + 1) % 8 === 0) {
			weekList.push(dayList);
			dayList = [];
		}
	});

	return weekList;
}

export { weeklyWeather };
