const key = process.env.APIKEY;

async function getCurrentWeather(lat, lon) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
		);

		const data = await response.json();

		return { ...data, error: false };
	} catch {
		return { error: 'We can not get weather information fron the API' };
	}
}

export { getCurrentWeather };
