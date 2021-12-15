const defaultConfig = {
	open: true,
	debug: true,
	animatable: true,
};

export default function draggable($target, config = defaultConfig) {
	let isOpen = config.open;
	let isDragging = false;
	const VISIBLE_WIDGET_POSITION = 0;
	let widgetPosition = VISIBLE_WIDGET_POSITION;
	let startY = 0;

	const $marker = $target.querySelector('[data-marker]');

	const { height: targetHeight } = $target.getBoundingClientRect();
	const { height: markerHeight } = $marker.getBoundingClientRect();

	const HIDDEN_WIDGET_POSITION = targetHeight - markerHeight;

	isOpen ? open() : close();
	if (config.animatable) setAnimations();

	// Event listeners

	$marker.addEventListener('click', handleClick);
	$marker.addEventListener('pointerdown', handlePointerDown);
	$marker.addEventListener('pointerup', handlePointerUp);
	$marker.addEventListener('pointerout', handlePointerOut);
	$marker.addEventListener('pointercancel', handlePointerCancel);
	$marker.addEventListener('pointermove', handlePointerMove);

	// Event listener function

	function handleClick(event) {
		toggle();
	}

	function handlePointerDown(event) {
		startDrag(event);
	}

	function handlePointerUp() {
		endDrag();
	}

	function handlePointerOut() {
		endDrag();
	}

	function handlePointerCancel() {
		endDrag();
	}

	function handlePointerMove(event) {
		drag(event);
	}

	function toggle() {
		if (!isDragging) {
			isOpen ? close() : open();
		}
	}

	function pageY(event) {
		return event.pageY || event.touches[0].pageY;
	}

	function startDrag(event) {
		isDragging = true;
		startY = pageY(event);
		removeAnimations();
	}

	function endDrag() {
		isDragging = false;
		setAnimations();
		bounce();
	}

	function drag(event) {
		const cursorY = pageY(event);
		const movementY = cursorY - startY;
		widgetPosition += movementY;
		startY = cursorY;
		if (widgetPosition > HIDDEN_WIDGET_POSITION) return false;
		setWidgetPosition(widgetPosition);
	}

	function bounce(event) {
		widgetPosition < targetHeight / 2 ? open() : close();
	}

	// Functions

	function logger(mesagge) {
		if (config.debug) {
			console.info(mesagge);
		}
	}

	function setWidgetPosition(value) {
		$target.style.marginBottom = `-${value}px`;
	}

	function open() {
		isOpen = true;
		widgetPosition = VISIBLE_WIDGET_POSITION;
		setWidgetPosition(widgetPosition);
	}

	function close() {
		isOpen = false;
		widgetPosition = HIDDEN_WIDGET_POSITION;

		setWidgetPosition(widgetPosition);
	}

	function setAnimations() {
		$target.style.transition = 'margin-bottom .3s';
	}

	function removeAnimations() {
		$target.style.transition = 'none';
	}
}
