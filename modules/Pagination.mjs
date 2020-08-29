export class Pagination {
	_$element = document.querySelector("#pagination");
	_$pagesList = document.querySelector("#pages");
	_$currentPage = document.querySelector("#current-page");
	_$start = document.querySelector("#range__start");
	_$end = document.querySelector("#range__end");
	_$total = document.querySelector("#range__total");

	constructor() {
		this.hide();
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
		this._updateList(page, pages);
	}

	_updateRange(start, end, total) {
		this._$start.textContent = start;
		this._$end.textContent = end;
		this._$total.textContent = total;
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

	_updateCurrentPage(currentPage) {
		this.currentPage = currentPage;
	}
}