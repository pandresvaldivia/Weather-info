export default class Vierwport {
	getViewPortHeight() {
		return window.innerHeight;
	}

	setViewPortHeight($element) {
		$element.style.blockSize = `${this.getViewPortHeight()}px`;
	}

	onViewPortResize(callback) {
		window.addEventListener('resize', callback);
	}

	viewportSize($element) {
		this.onViewPortResize(() => this.setViewPortHeight($element));
	}
}
