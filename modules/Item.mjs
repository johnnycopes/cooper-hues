import { createElement, appendNested } from "../utility/dom";

export class Item {
	constructor(item) {
		const { id, images, title, url } = item;
		this._id = id;
		this._images = images;
		this._title = title;
		this._url = url;
	}

	buildElement() {
		const $element = createElement({
			tagName: "li",
			classes: ["item"],
			dataAttrs: { id: this._id }
		});
		const $link = createElement({
			tagName: "a",
			classes: ["item__link"],
			attrs: { href: this._url }
		});
		const $figure = createElement({
			tagName: "figure",
			classes: ["item__container"]
		})
		const $caption = this._buildCaption(this._title);
		const $img = createElement({
			tagName: "img",
			classes: ["item__image"],
			attrs: { src: this._images[0].n.url }
		});
		appendNested($element, $link, $figure);
		$figure.append($caption, $img);
		return $element;
	}

	_buildCaption(title) {
		const [line1, line2, line3] = title.split(",");
		const $caption = createElement({
			tagName: "figcaption",
			classes: ["item__caption"]
		});
		const $item = createElement({
			tagName: "p",
			classes: ["item__title"],
			content: line1
		});
		$caption.append($item);
		if (!line2 && !line3) {
			return $caption;
		}
		if (line3) {
			const $details = createElement({
				tagName: "p",
				classes: ["item__description"],
				content: line2
			});
			$caption.append($details);
		}
		const $year = createElement({
			tagName: "p",
			classes: ["item__year"],
			content: line3 ? line3 : line2
		});
		$caption.append($year);
		return $caption;
	}
}