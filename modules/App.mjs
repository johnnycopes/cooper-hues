import { Data } from "./Data.mjs";
import { Palette } from "./Palette.mjs";
import { Results } from "./Results.mjs";
import { Selection } from "./Selection.mjs";
import { Pagination } from "./Pagination.mjs";

export class App {
	_data = new Data();
	_selection = new Selection();
	_pagination = new Pagination();
	_results = new Results(this._pagination);

	async init() {
		const colors = await this._data.fetchColors();
		this._palette = new Palette(colors);
		this._palette.bindClickHandler(event => this._onPaletteClick(event));
		this._selection.bindClickHandler(event => this._onSelectionClick(event));
		this._pagination.bindClickHandler(event => this._onPaginationClick(event));
		this._updateResults();
	}

	_onPaletteClick(event) {
		const color = this._palette.onColorClick(event);
		if (!color) {
			return;
		}
		const colorAdded = this._selection.addColor(color);
		if (colorAdded) {
			this._pagination.currentPage = 1;
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
			this._pagination.currentPage = 1;
			this._updateResults();
		}
	}

	_onPaginationClick(event) {
		const page = this._pagination.onPageClick(event);
		if (!page) {
			return;
		}
		this._pagination.currentPage = page;
		this._updateResults();
	}

	async _updateResults() {
		this._results.setLoading();
		const selectedColors = this._selection.colors;
		const currentPage = this._pagination.currentPage;
		const items = await this._data.fetchItems(selectedColors, currentPage);
		this._results.update(items, !!selectedColors.length);
	}
}