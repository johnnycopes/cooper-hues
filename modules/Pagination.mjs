import { hasClassSubstr, containsSubstr } from "../utility/dom.js";

export class Pagination {
	currentPage = 1;
	_$element = document.querySelector("#pagination");
	_$start = document.querySelector("#range__start");
	_$end = document.querySelector("#range__end");
	_$total = document.querySelector("#range__total");
	_$pagesList = document.querySelector("#pages");
	_$currentPage = document.querySelector("#current-page");
	_$menu = document.querySelector("#pagination__menu");
	_$menuIcons = this._$menu.querySelectorAll("svg");
	_$first = this._$menu.querySelector("#menu__first");
	_$previous = this._$menu.querySelector("#menu__previous");
	_$next = this._$menu.querySelector("#menu__next");
	_$last = this._$menu.querySelector("#menu__last");

	constructor() {
		this.hide();
	}

	bindClickHandler(callback) {
		this._$element.addEventListener("click", callback);
	}

	onPageClick(event) {
		const target = event.target;
		if ((!target.matches("li") && !target.matches("svg")) || containsSubstr(target, "disabled", "current")) {
			return;
		}
		const page = event.target.dataset.page;
		return page;
	}

	hide() {
		this._$element.classList.add("hidden");
	}

	update(items) {
		this._$element.classList.remove("hidden");
		const { page, pages, per_page, total } = items;
		const start = 1 + ((page - 1) * per_page);
		const end = Math.min(page * per_page, total);
		this._updateRange(start, end, total);
		this._updateIcons(page, pages);
		this._updateList(page, pages);
	}

	_updateRange(start, end, total) {
		this._$start.textContent = start;
		this._$end.textContent = end;
		this._$total.textContent = total;
	}

	_updateIcons(currentPage, totalPages) {
		console.log("update fired");
		if (totalPages <= 1) {
			this._$menuIcons.forEach(menuIcon => menuIcon.classList.add("hidden"));
			return;
		}
		this._$first.dataset.page = 1;
		this._$previous.dataset.page = Math.max(currentPage - 1, 1);
		this._$next.dataset.page = Math.min(currentPage + 1, totalPages);
		this._$last.dataset.page = totalPages;
		this._$menuIcons.forEach(menuIcon => menuIcon.classList.remove("hidden"));
		this._$menuIcons.forEach(menuIcon => {
			if (Number(menuIcon.dataset.page) === currentPage) {
				menuIcon.classList.add("menu__icon--disabled");
			} else {
				menuIcon.classList.remove("menu__icon--disabled");
			}
		})
	}

	_updateList(currentPage, totalPages) {
		this._$pagesList.innerHTML = "";
		if (totalPages <= 1) {
			return;
		}
		for (let i = 1; i <= totalPages; i++) {
			const $page = document.createElement("li");
			$page.classList.add("page");
			$page.dataset.page = i;
			if (i === currentPage) {
				$page.classList.add("page--current");
			}
			$page.textContent = i;
			this._$pagesList.append($page);
		}
	}

	_getPage(str) {

	}
}