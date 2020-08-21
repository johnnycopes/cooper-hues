export class Palette {
	$element = document.querySelector("#palette");

	constructor(colors = []) {
		this.colors = colors;
		this.colors.forEach(color => {
			const $color = color.buildElement();
			this.$element.append($color);
		});
	}

	bindClickHandler(callback) {
		this.$element.addEventListener("click", callback);
	}

	onColorClick(event) {
		const target = event.target;
		if (!target.matches("li")) {
			return;
		}
		const color = this.colors.find(color => color.name === target.dataset.name);
		return color;
	}
}