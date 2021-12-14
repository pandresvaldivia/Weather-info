import { getCoordinates } from './geolocation.js';
import { getWeatherInfo } from './services/weather.js';
import { $tabsContainer, $container } from './selectors.js';
import Panel from './utils/panel.js';
import Draggable from './animation/draggable.js';

async function weeklyWeather() {
	const { latitude, longitude, error } = await getCoordinates();

	if (error) return console.error(error);

	const weatherData = await getWeatherInfo(latitude, longitude, 'forecast');

	if (weatherData.error) return new Error(weatherData.error);

	const list = formatWeekList(weatherData.list);

	const panel = new Panel($tabsContainer, list);

	panel.printPanels();

	const draggable = new Draggable($container, { debug: true, state: 'open' });
	draggable.setPositionVariables();
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
