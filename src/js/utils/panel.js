import { formatTemp, formatDate } from './format-data.js';

export default class Panel {
	constructor($container, list) {
		this.$container = $container;
		this.list = list;
	}

	createPanel(info, index) {
		const $panel = this.createTabPanel(index);

		info.forEach((weatherInfo, index) => {
			console.log(weatherInfo);
			const data = this.getWeatherInfo(weatherInfo);
			const $item = this.createItem(data, index);
			$panel.querySelector('.dayWeather-list').appendChild($item);
		});

		return $panel;
	}

	createTabPanel(index) {
		const panelHtml = `
        <div class="tabPanel" tabindex="${index}" aria-labelledby="tab-${index}">
			<div class="dayWeather" id="dayWeather-${index}">
				<ul class="dayWeather-list" id="dayWeather-list-${index}">
				</ul>
				<section class="extraInfo" aria-label="Extra information">
			<article class="extraInfo-max" aria-label="Maximum temperature">Max: ${
				25 + index
			}</article>
			<article class="extraInfo-min" aria-label="Minimum temperature">Min: 18</article>
			<article class="extraInfo-wind" aria-label="Wind">Wind: 16 Km-h</article>
			<article class="extraInfo-humidity" aria-label="Humidity">Humidity: 63%</article>
				</section> 
			</div>
		</div>
        `;

		const $panel = this.createDOMElement(panelHtml);

		if (index > 0) $panel.hidden = true;

		return $panel;
	}

	createItem({ temp, date, icon, description }, index) {
		const itemHtml = `
			<li class="dayWeather-item">
				<span class="dayWeather-time">${date}</span>
				<img
					class="dayWeather-icon"
					height="48"
					width="48"
					src="https://openweathermap.org/img/wn/${icon}@2x.png"
					alt="${description}"
				/>
				<span class="dayWeather-temp">${temp}</span>
			</li>
		`;

		const $item = this.createDOMElement(itemHtml);
		if (index === 0) $item.classList.add('is-selected');

		return $item;
	}

	createDetails() {
		const detailsHtml = `
			<article aria-label="Maximum temperature">Max: 26</article>
			<article aria-label="Minimum temperature">Min: 18</article>
			<article aria-label="Wind">Wind: 16 Km-h</article>
			<article aria-label="Humidity">Humidity: 63%</article>
		`;

		const $details = this.createDOMElement(detailsHtml);

		return $details;
	}

	printPanels() {
		this.list.forEach((item, index) => {
			const panel = this.createPanel(item, index);
			this.$container.appendChild(panel);
		});
	}

	createDOMElement(string) {
		const parser = new DOMParser();
		const html = parser.parseFromString(string, 'text/html');
		return html.body.firstChild;
	}

	getWeatherInfo(data) {
		const dateFormat = {
			hour: 'numeric',
			hour12: true,
		};

		const temp = formatTemp(data.main.temp);
		const date = formatDate(new Date(data.dt * 1000), dateFormat, 'es');

		return {
			temp,
			date,
			icon: data.weather[0].icon,
			description: data.weather[0].description,
		};
	}
}
