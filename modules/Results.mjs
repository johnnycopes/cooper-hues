import { $, createElement } from "../utility/dom";
import { Item } from "./Item";

export class Results {
	_$element = $("#results");
	_items = [];

	constructor(pagination) {
		this._pagination = pagination;
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
		this._pagination.hide();
	}

	_setInstructions() {
		this._clear();
		this._$element.append(this._$instructions);
		this._pagination.hide();
	}

	_setNoResults() {
		this._clear();
		this._$element.append(this._$noResults);
		this._pagination.hide();
	}

	_setItems(items) {
		this._clear();
		this._items = items.objects.map(item => new Item(item));
		this._items.forEach(item => {
			const $item = item.buildElement();
			this._$element.append($item);
		})
		this._pagination.update(items)
	}

	_clear() {
		this._$element.innerHTML = "";
	}

	_buildLoader() {
		return createElement({
			tagName: "div",
			classes: ["loader"]
		});
	}

	_buildInstructions() {
		return createElement({
			tagName: "div",
			classes: ["instructions"],
			content: "Choose a color to see items"
		});
	}

	_buildNoResults() {
		return createElement({
			tagName: "div",
			classes: ["no-results"],
			content: "No results found"
		});
	}
}