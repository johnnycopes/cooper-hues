import { $, $$, containsSubstr, createElement } from "../utility/dom";

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
		const start = Math.max(1, currentPage - 3);
		const end = Math.min(totalPages, currentPage + 3);
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