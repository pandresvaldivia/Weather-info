import { weatherCode } from '../constants.js';

const defaultDateFormat = {
	day: 'numeric',
	weekday: 'long',
	month: 'long',
};

function formatDate(date, format = defaultDateFormat, language = 'en-US') {
	return new Intl.DateTimeFormat(language, format).format(date);
}

function formatTemp(temp) {
	return `${temp.toFixed()}°`;
}

function formatCode(code) {
	return String(code).charAt();
}

function formatUrl(code, time) {
	const weather = weatherCode[formatCode(code)];
	const is2x = window.matchMedia('(-webkit-min-device-pixel-ratio:2)').matches
		? '@2x'
		: '';

	return `url(./assets/images/${time}-${weather}${is2x}.webp)`;
}

export { formatDate, formatTemp, formatUrl };
