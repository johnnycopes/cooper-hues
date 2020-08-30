export function containsSubstr(element, ...substrings) {
	const classNames = Array.from(element.classList);
	return substrings.some(substr => 
		classNames.some(className => className.includes(substr))
	);
}