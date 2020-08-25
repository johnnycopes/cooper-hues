import { Item } from "./Item.mjs";

export class Results {
	_$element = document.querySelector("#results");
	_items = [];

	constructor() {
		this._$loader = this._buildLoader();
		this._$instructions = this._buildInstructions();
		this._$noResults = this._buildNoResults();
	}

	update(items, selectionHasColors) {
		if (items?.objects?.length) {
			this._setItems(items);
		} else if (selectionHasColors) {
			this._setNoResults();
		} else {
			this._setInstructions();
		}
	}

	setLoading() {
		this._clear();
		this._$element.append(this._$loader)
	}

	_setInstructions() {
		this._clear();
		this._$element.append(this._$instructions);
	}

	_setNoResults() {
		this._clear();
		this._$element.append(this._$noResults);
	}

	_setItems(items) {
		this._clear();
		if (!items.objects) {
			return;
		}
		this.currentPage = items.page;
		this._items = items.objects.map(item => new Item(item));
		this._items.forEach(item => {
			const $item = item.buildElement();
			this._$element.append($item);
		})
	}

	_clear() {
		this._$element.innerHTML = "";
	}

	_buildLoader() {
		const $loader = document.createElement("div");
		$loader.classList.add("loader");
		return $loader;
	}

	_buildInstructions() {
		const $instructions = document.createElement("div");
		$instructions.classList.add("instructions");
		$instructions.textContent = "Choose a color to see items";
		return $instructions;
	}

	_buildNoResults() {
		const $noResults = document.createElement("div");
		$noResults.classList.add("no-results");
		$noResults.textContent = "No results found";
		return $noResults;
	}
}