export class Item {
	constructor(item) {
		const { id, images, title, url } = item;
		this.id = id;
		this.images = images;
		this.title = title;
		this.url = url;
	}

	buildElement() {
		const $element = document.createElement("li");
		const $link = document.createElement("a");
		const $figure = document.createElement("figure");
		const $caption = this.buildCaption(this.title);
		const $img = document.createElement("img");
		$element.classList.add("item");
		$element.dataset.id = this.id;
		$element.append($link);
		$link.classList.add("item__link");
		$link.href = this.url;
		$link.append($figure);
		$figure.classList.add("item__container")
		$figure.append($caption);
		$figure.append($img);
		$img.classList.add("item__image");
		$img.src = this.images[0].n.url;
		return $element;
	}

	buildCaption(title) {
		const [ line1, line2, line3 ] = title.split(",");
		const $caption = document.createElement("figcaption");
		$caption.classList.add("item__caption");
		const $item = document.createElement("p");
		$item.classList.add("item__title");
		$item.textContent = line1;
		$caption.append($item);
		if (!line2 && !line3) {
			return $caption;
		}
		if (line3) {
			const $details = document.createElement("p");
			$details.classList.add("item__description");
			$details.textContent = line2;
			$caption.append($details);
		}
		const $year = document.createElement("p");
		$year.classList.add("item__year");
		$year.textContent = line3 ? line3 : line2;
		$caption.append($year);
		return $caption;
	}
}