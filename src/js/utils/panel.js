import { formatTemp, formatDate } from './format-data.js';

export default class Panel {
	constructor($container, list) {
		this.$container = $container;
		this.list = list;
	}

	createPanel(info, index) {
		const $panel = this.createTabPanel(index);

		info.forEach((weatherInfo, index) => {
			const data = this.getWeatherInfo(weatherInfo);
			const $item = this.createItem(data, index);
			$panel.querySelector('.dayWeather-list').appendChild($item);

			const $details = this.createDetails(data, index);
			$panel.querySelector('.extraInfo-container').appendChild($details);
		});

		return $panel;
	}

	createTabPanel(index) {
		const panelHtml = `
        <div class="tabPanel" tabindex="${index}" aria-labelledby="tab-${index}">
			<div class="dayWeather" id="dayWeather-${index}">
				<ul class="dayWeather-list" id="dayWeather-list-${index}">
				</ul>
				<section class="extraInfo-container" aria-label="Extra information">
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
			<li class="dayWeather-item" data-index="${index}">
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
		const _this = this;
		$item.addEventListener('click', () => _this.handleItemClick($item, _this));
		if (index === 0) $item.classList.add('is-selected');

		return $item;
	}

	createDetails({ max, min, wind, humidity }, index) {
		const detailsHtml = `
			<div class="extraInfo" id="extraInfo-${index}">
				<article class="extraInfo-max aria-label="Maximum temperature">Max: <span class="extraInfo-datum">${max}</span></article>
				<article class="extraInfo-min" aria-label="Minimum temperature">Min: <span class="extraInfo-datum">${min}</span></article>
				<article class="extraInfo-wind" aria-label="Wind">Wind: <span class="extraInfo-datum">${wind} Km-h</span></article>
				<article class="extraInfo-humidity" aria-label="Humidity">Humidity: <span class="extraInfo-datum">${humidity}%</span></article>
			</div>
		`;

		const $details = this.createDOMElement(detailsHtml);
		if (index > 0) $details.classList.add('is-hidden');

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
		const min = formatTemp(data.main.temp_min);
		const max = formatTemp(data.main.temp_max);
		const date = formatDate(new Date(data.dt * 1000), dateFormat, 'es');

		return {
			temp,
			date,
			min,
			max,
			icon: data.weather[0].icon,
			description: data.weather[0].description,
			humidity: data.main.humidity,
			wind: data.wind.speed,
		};
	}

	handleItemClick(elem, _this) {
		_this.chooseItem(elem);
	}

	chooseItem($item) {
		const $selectedItem = document.querySelector(
			'.tabPanel:not([hidden]) .dayWeather-item.is-selected'
		);

		$selectedItem.classList.remove('is-selected');
		$selectedItem.ariaSelected = false;

		$item.classList.add('is-selected');
		$item.ariaSelected = true;

		this.chooseInfo($item.dataset.index);
	}

	chooseInfo(index) {
		const $selectedInfo = document.querySelector(
			'.tabPanel:not([hidden]) .extraInfo:not(.is-hidden)'
		);
		const $info = document.querySelector(
			`.tabPanel:not([hidden]) #extraInfo-${index}`
		);

		$selectedInfo.classList.add('is-hidden');
		$info.classList.remove('is-hidden');
	}
}
