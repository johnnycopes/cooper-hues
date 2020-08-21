export class Color {
	constructor(hex, name, palette) {
		this.hex = hex;
		this.name = name;
		this.palette = palette;
	}

	buildElement() {
		const $element = document.createElement("li");
		$element.classList.add("color");
		$element.style.background = this.hex;
		$element.dataset.hex = this.hex;
		$element.dataset.name = this.name;
		$element.dataset.palette = this.palette;
		return $element;
	}
}