export function $(selector, parent = document) {
	return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
	return parent.querySelectorAll(selector);
}

export function bulkAddClass(nodeList, className) {
	nodeList.forEach(element => element.classList.add(className));
}

export function bulkRemoveClass(nodeList, className) {
	nodeList.forEach(element => element.classList.remove(className));
}

export function bulkUpdateClass(nodeList, className, conditionFn) {
	nodeList.forEach(element => {
		if (conditionFn(element)) {
			element.classList.add(className);
		} else {
			element.classList.remove(className);
		}
	})
}

export function createElement(configObj = {
	tagName: "p",
	classes: [],
	styles: {},
	attrs: {},
	dataAttrs: {},
	content: "",
}) {
	const { tagName, classes, styles, attrs, dataAttrs, content } = configObj;
	const $element = document.createElement(tagName);
	if (classes?.length) {
		classes.forEach(className => className && $element.classList.add(className));
	}
	if (styles) {
		setWithEntries($element, styles, (el, name, value) => el.style[name] = value);
	}
	if (attrs) {
		setWithEntries($element, attrs, (el, name, value) => el[name] = value);
	}
	if (dataAttrs) {
		setWithEntries($element, dataAttrs, (el, name, value) => el.dataset[name] = value);
	}
	if (content) {
		$element.textContent = content;
	}
	return $element;
}

function setWithEntries(el, obj, setFn) {
	Object.entries(obj).forEach(entry => {
		const [name, value] = entry;
		setFn(el, name, value);
	});
}

export function appendNested(...elements) {
	for (let i = 0; i < elements.length - 1; i++) {
		elements[i].append(elements[i + 1]);
	}
}

export function containsSubstr(element, ...substrings) {
	const classNames = Array.from(element.classList);
	return substrings.some(substr => 
		classNames.some(className => className.includes(substr))
	);
}
