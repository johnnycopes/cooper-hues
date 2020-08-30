import { $ } from "../utility/dom";

export class Palette {
	_$element = $("#palette");

	constructor(colors = []) {
		this._colors = colors;
		this._colors.forEach(color => {
			const $color = color.buildElement();
			this._$element.append($color);
		});
	}

	bindClickHandler(callback) {
		this._$element.addEventListener("click", callback);
	}

	onColorClick(event) {
		const target = event.target;
		if (!target.matches("li")) {
			return;
		}
		const color = this._colors.find(color => color.name === target.dataset.name);
		return color;
	}
}