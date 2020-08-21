import { Item } from "./Item.mjs";

export class Results {
	$element = document.querySelector("#results");
	items = [];

	setItems(items) {
		this.$element.innerHTML = "";
		if (!items.objects) {
			return;
		}
		this.currentPage = items.page;
		this.items = items.objects.map(item => new Item(item));
		this.items.forEach(item => {
			const $item = item.buildElement();
			this.$element.append($item);
		})
	}
}