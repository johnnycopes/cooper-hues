export class Selection {
	$element = document.querySelector("#selection");
	colors = [];
	maxLength = 3;

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

	addColor(targetColor) {
		if (this.colors.includes(targetColor) || this.colors.length + 1 > this.maxLength) {
			return;
		}
		this.colors.push(targetColor);
		const $color = targetColor.buildElement();
		this.$element.append($color);
	}

	removeColor(targetColor) {
		const targetColorIndex = this.colors.findIndex(color => color.name === targetColor.name);
		this.colors.splice(targetColorIndex, 1);
		const $color = this.$element.children.item(targetColorIndex);
		$color.remove();
	}
}