import { Data } from "./Data.mjs";
import { Palette } from "./Palette.mjs";
import { Results } from "./Results.mjs";
import { Selection } from "./Selection.mjs";

export class App {
	_data = new Data();
	_results = new Results();

	async init() {
		const colors = await this._data.fetchColors();
		this._palette = new Palette(colors);
		this._selection = new Selection();
		this._palette.bindClickHandler((event) => this._onPaletteClick(event));
		this._selection.bindClickHandler((event) => this._onSelectionClick(event));
	}

	_onPaletteClick(event) {
		const color = this._palette.onColorClick(event);
		if (color) {
			this._selection.addColor(color);
			this._updateResults();
		}
	}

	_onSelectionClick(event) {
		const color = this._selection.onColorClick(event);
		if (color) {
			this._selection.removeColor(color);
			this._updateResults();
		}
	}

	async _updateResults() {
		const items = await this._data.fetchItems(this._selection.colors);
		this._results.setItems(items);
	}
}