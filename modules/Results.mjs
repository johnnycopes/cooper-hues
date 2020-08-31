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
			const $item = item.buildElement();
			this._$element.append($item);
		})
		this._pagination.update(items)
	}

	_setElement($element) {
		this._$element.innerHTML = "";
		this._$element.append($element);
		this._pagination.hide();
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