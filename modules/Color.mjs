import { createElement } from "../utility/dom";

export class Color {
	constructor(name, hex, palette) {
		this.name = name;
		this._hex = hex;
		this._palette = palette;
	}

	render() {
		return createElement({
			tagName: "li",
			classes: ["color"],
			styles: { background: this._hex },
			dataAttrs: {
				name: this.name,
				hex: this._hex,
				palette: this._palette
			}
		});
	}
}