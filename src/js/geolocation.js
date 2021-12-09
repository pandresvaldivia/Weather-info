const defaulOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 100000,
};

function geolocationSupport() {
	return 'geolocation' in navigator;
}

function getGeolocation(options = defaulOptions) {
	if (!geolocationSupport()) throw new Error('Geolocation is not supported');

	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(data) => {
				resolve(data);
			},
			() => {
				reject(new Error('We can not get your location'));
			},
			options
		);
	});
}

async function getCoordinates(options = defaulOptions) {
	try {
		const {
			coords: { latitude, longitude },
		} = await getGeolocation(options);
		return { latitude, longitude, error: false };
	} catch ({ message }) {
		return { latitude: null, longitude: null, error: message };
	}
}

export { getCoordinates };
