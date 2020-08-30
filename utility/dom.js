export function $(selector, parent = document) {
	return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
	return parent.querySelectorAll(selector);
}

export function createElement(configObj = {
	tagName: "p",
	classes: [],
	styles: {},
	dataAttrs: {},
	content: "",
}) {
	const { tagName, classes, styles, dataAttrs, content } = configObj;
	const el = document.createElement(tagName);
	if (classes?.length) {
		classes.forEach(className => className && el.classList.add(className));
	}
	if (styles) {
		Object.entries(styles).forEach(entry => {
			const [name, value] = entry;
			el.style[name] = value;
		})
	}
	if (dataAttrs) {
		Object.entries(dataAttrs).forEach(entry => {
			const [name, value] = entry;
			el.dataset[name] = value;
		})
	}
	if (content) {
		el.textContent = content;
	}
	return el;
}

export function containsSubstr(element, ...substrings) {
	const classNames = Array.from(element.classList);
	return substrings.some(substr => 
		classNames.some(className => className.includes(substr))
	);
}
