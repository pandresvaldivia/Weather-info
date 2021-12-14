const defaultConfig = {
	debug: false,
	state: 'open',
};

export default class Draggable {
	constructor($target, config = defaultConfig) {
		this.$target = $target;
		this.config = config;
		this.config.state === 'open'
			? (this.state = 'open')
			: (this.state = 'close');
		this.VISIBLE_Y_POSITION = '0';
		this.setWidgetMarker();
		this.setWidgetDimensions();
		this.setPositionVariables();
	}

	setWidgetMarker() {
		this.$marker = this.$target.querySelector('[data-marker]');
	}

	setWidgetDimensions() {
		const { height: widgetHeight } = this.$target.getBoundingClientRect();
		const { height: markerHeight } = this.$marker.getBoundingClientRect();
		this.TARGET_BLOCK_SIZE = widgetHeight;
		this.MARKER_BLOCK_SIZE = markerHeight;
	}

	setPositionVariables() {
		this.HIDDEN_Y_POSITION = this.TARGET_BLOCK_SIZE - this.MARKER_BLOCK_SIZE;

		this.postion =
			this.state === 'open' ? this.VISIBLE_Y_POSITION : this.HIDDEN_Y_POSITION;

		const position = this.postion;
		this.setWidgetPosition(position);
	}

	logger(message) {
		if (this.config.debug) console.info(message);
	}

	setWidgetPosition(value) {
		this.$target.style.marginBlockEnd = `-${value}px`;
	}

	open() {
		this.state = 'open';
		this.logger(this.config);
	}

	close() {
		this.state = 'close';
	}
}
