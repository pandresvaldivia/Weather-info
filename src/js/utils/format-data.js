const defaultDateFormat = {
	day: 'numeric',
	weekday: 'long',
	month: 'long',
};

function formatDate(date, format = defaultDateFormat) {
	return new Intl.DateTimeFormat('en-US', format).format(date);
}

function formatTemp(temp) {
	return `${temp.toFixed()}°`;
}

export { formatDate, formatTemp };
