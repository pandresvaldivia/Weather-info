const defaultConfig = {
	open: true,
	debug: true,
	animatable: true,
};

export default class Draggable {
	constructor($target, config = defaultConfig) {
		this.$target = $target;
		this.config = config;
		this.isOpen = config.open;
		this.VISIBLE_WIDGET_POSITION = 0;
		this.startY = 0;
		this.isDragging = false;
		this.setMarker();
		this.setDimensions();
		this.setPositions();
		this.isOpen ? this.open() : this.close();
		if (this.config.animatable) this.setAnimations();
	}

	// Initial values
	setPositions() {
		this.position = this.VISIBLE_WIDGET_POSITION;
		this.HIDDEN_WIDGET_POSITION =
			this.TARGET_BLOCK_SIZE - this.MARKER_BLOCK_SIZE;
	}

	setDimensions() {
		const { height: targetHeight } = this.$target.getBoundingClientRect();
		const { height: markerHeight } = this.$marker.getBoundingClientRect();
		this.TARGET_BLOCK_SIZE = targetHeight;
		this.MARKER_BLOCK_SIZE = markerHeight;
	}

	setMarker() {
		const $marker = this.$target.querySelector('[data-marker]');
		if (!$marker) return console.error('Marker element is required');

		this.$marker = $marker;
		this.addEventListeners();
	}

	setAnimations() {
		this.$target.style.transition = 'margin-bottom .3s';
	}

	removeAnimations() {
		this.$target.style.transition = 'none';
	}

	// Events listeners
	addEventListeners() {
		const _this = this;
		this.$marker.addEventListener('click', () => _this.handleClick(_this));
		this.$marker.addEventListener('pointerdown', (e) =>
			_this.handlePointerDown(e, _this)
		);
		this.$marker.addEventListener('pointerup', () =>
			_this.handlePointerUp(_this)
		);
		this.$marker.addEventListener('pointerout', () =>
			_this.handlePointerOut(_this)
		);
		this.$marker.addEventListener('pointercancel', () =>
			_this.handlePointerCancel(_this)
		);
		this.$marker.addEventListener('pointermove', (e) =>
			_this.handlePointerMove(e, _this)
		);
	}

	// Actions
	open() {
		this.isOpen = true;
		this.position = this.VISIBLE_WIDGET_POSITION;
		this.setWidgetPosition(this.position);
	}

	close() {
		this.isOpen = false;
		this.position = this.HIDDEN_WIDGET_POSITION;
		this.setWidgetPosition(this.position);
	}

	setWidgetPosition(value) {
		this.$target.style.marginBottom = `-${value}px`;
	}

	// Handlers
	handleClick(_this) {
		_this.toggle();
	}

	handlePointerDown(event, _this) {
		_this.startDrag(event);
	}

	handlePointerUp(_this) {
		_this.endDrag();
	}

	handlePointerOut(_this) {
		_this.endDrag();
	}

	handlePointerCancel(_this) {
		_this.endDrag();
	}

	handlePointerMove(event, _this) {
		_this.drag(event);
	}

	// Events
	toggle() {
		if (!this.isDragging) {
			this.isOpen ? this.close() : this.open();
		}
	}

	pageY(event) {
		return event.pageY || event.touches[0].pageY;
	}

	startDrag(event) {
		this.isDragging = true;
		this.startY = this.pageY(event);
		this.removeAnimations();
	}

	endDrag() {
		this.isDragging = false;
		this.setAnimations();
		this.bounce();
	}

	bounce() {
		this.position < this.TARGET_BLOCK_SIZE / 2 ? this.open() : this.close();
	}

	drag(event) {
		const cursorY = this.pageY(event);
		const movementY = cursorY - this.startY;
		this.position += movementY;
		this.startY = cursorY;
		if (this.position > this.HIDDEN_WIDGET_POSITION) return false;
		this.setWidgetPosition(this.position);
	}
}
