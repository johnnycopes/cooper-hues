import { $, $$, containsSubstr, createElement, bulkAddClass, bulkRemoveClass, bulkUpdateClass } from "../utility/dom";

export class Pagination {
	currentPage = 1;
	_$element = $("#pagination");
	_$start = $("#range__start");
	_$end = $("#range__end");
	_$total = $("#range__total");
	_$pagesList = $("#pages");
	_$currentPage = $("#current-page");
	_$menu = $("#pagination__menu");
	_$menuIcons = $$("svg", this._$menu);
	_$first = $("#menu__first", this._$menu);
	_$previous = $("#menu__previous", this._$menu);
	_$next = $("#menu__next", this._$menu);
	_$last = $("#menu__last", this._$menu);

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
		if (totalPages <= 1) {
			bulkAddClass(this._$menuIcons, "hidden");
			return;
		}
		this._$first.dataset.page = 1;
		this._$previous.dataset.page = Math.max(currentPage - 1, 1);
		this._$next.dataset.page = Math.min(currentPage + 1, totalPages);
		this._$last.dataset.page = totalPages;
		bulkRemoveClass(this._$menuIcons, "hidden");
		bulkUpdateClass(
			this._$menuIcons, "menu-icon--disabled",  element => Number(element.dataset.page) === currentPage
		);
	}

	_updateList(currentPage, totalPages) {
		this._$pagesList.innerHTML = "";
		if (totalPages <= 1) {
			return;
		}
		const pagesRange = 3;
		const start = Math.max(1, currentPage - pagesRange);
		const end = Math.min(totalPages, currentPage + pagesRange);
		for (let i = start; i <= end; i++) {
			const $page = createElement({
				tagName: "li",
				classes: ["page", i === currentPage ? "page--current" : ""],
				content: i.toString()
			});
			this._$pagesList.append($page);
		}
	}
}