import { Item } from "./Item.mjs";

export class Results {
	_$element = document.querySelector("#results");
	_items = [];

	setItems(items) {
		this._$element.innerHTML = "";
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
}