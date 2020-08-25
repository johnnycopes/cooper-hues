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
		this._palette.bindClickHandler(event => this._onPaletteClick(event));
		this._selection.bindClickHandler(event => this._onSelectionClick(event));
		this._updateResults();
	}

	_onPaletteClick(event) {
		const color = this._palette.onColorClick(event);
		if (!color) {
			return;
		}
		const colorAdded = this._selection.addColor(color);
		if (colorAdded) {
			this._updateResults();
		}
	}

	_onSelectionClick(event) {
		const color = this._selection.onColorClick(event);
		if (!color) {
			return;
		}
		const colorRemoved = this._selection.removeColor(color);
		if (colorRemoved) {
			this._updateResults();
		}
	}

	async _updateResults() {
		this._results.setLoading();
		const selectedColors = this._selection.colors;
		const items = await this._data.fetchItems(selectedColors);
		this._results.update(items, !!selectedColors.length);
	}
}