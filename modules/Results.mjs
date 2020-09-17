import { $, createElement } from "../utility/dom";
import { Item } from "./Item";

export class Results {
	_$element = $("#results");
	_items = [];

	constructor(pagination) {
		this._pagination = pagination;
		this._$loader = this._createLoader();
		this._$instructions = this._createInstructions();
		this._$noResults = this._createNoResults();
	}

	update(items, selectionHasColors) {
		if (items.objects?.length) {
			this._setItems(items);
		} else if (selectionHasColors) {
			this._setElement(this._$noResults);
		} else {
			this._setElement(this._$instructions);
		}
	}

	setLoading() {
		this._setElement(this._$loader);
	}

	_setItems(items) {
		this._$element.innerHTML = "";
		this._items = items.objects.map(item => new Item(item));
		this._items.forEach(item => {
			const $item = item.render();
			this._$element.append($item);
		})
		this._pagination.update(items)
	}

	_setElement($element) {
		this._$element.innerHTML = "";
		this._$element.append($element);
		this._pagination.hide();
	}

	_createLoader() {
		return createElement({
			tagName: "div",
			classes: ["loader"]
		});
	}

	_createInstructions() {
		return createElement({
			tagName: "div",
			classes: ["instructions"],
			content: "Choose a color to see items"
		});
	}

	_createNoResults() {
		return createElement({
			tagName: "div",
			classes: ["no-results"],
			content: "No items found"
		});
	}
}