import { $ } from "../utility/dom";

export class Selection {
	_colors = [];
	get colors() {
		return this._colors.slice();
	}
	_$element = $("#selection");
	_maxLength = 3;

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

	addColor(targetColor) {
		if (this._colors.includes(targetColor) || this._colors.length + 1 > this._maxLength) {
			return false;
		}
		this._colors.push(targetColor);
		const $color = targetColor.buildElement();
		this._$element.append($color);
		return true;
	}

	removeColor(targetColor) {
		const targetColorIndex = this._colors.findIndex(color => color.name === targetColor.name);
		this._colors.splice(targetColorIndex, 1);
		const $color = this._$element.children.item(targetColorIndex);
		$color.remove();
		return true;
	}
}