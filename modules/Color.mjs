export class Color {
	constructor(hex, name, palette) {
		this.name = name;
		this._hex = hex;
		this._palette = palette;
	}

	buildElement() {
		const $element = document.createElement("li");
		$element.classList.add("color");
		$element.style.background = this._hex;
		$element.dataset.hex = this._hex;
		$element.dataset.name = this.name;
		$element.dataset.palette = this._palette;
		return $element;
	}
}