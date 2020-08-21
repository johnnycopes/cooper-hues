import { Data } from "./Data.mjs";
import { Palette } from "./Palette.mjs";
import { Results } from "./Results.mjs";
import { Selection } from "./Selection.mjs";

export class App {
	data = new Data();
	results = new Results();

	async init() {
		const colors = await this.data.fetchColors();
		this.palette = new Palette(colors);
		this.selection = new Selection();
		this.palette.bindClickHandler((event) => this.onPaletteClick(event));
		this.selection.bindClickHandler((event) => this.onSelectionClick(event));
	}

	onPaletteClick(event) {
		const color = this.palette.onColorClick(event);
		if (color) {
			this.selection.addColor(color);
			this.updateResults();
		}
	}

	onSelectionClick(event) {
		const color = this.selection.onColorClick(event);
		if (color) {
			this.selection.removeColor(color);
			this.updateResults();
		}
	}

	async updateResults() {
		const items = await this.data.fetchItems(this.selection.colors);
		this.results.setItems(items);
	}
}