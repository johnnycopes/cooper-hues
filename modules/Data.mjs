import { Color } from "./Color.mjs";

export class Data {
	_baseUrl = "https://api.collection.cooperhewitt.org/rest/";
	_accessToken = process.env.API_KEY;
	_getColorsMethod = "colors.palettes.getInfo";
	_getItemsMethod = "search.objects";

	async fetchColors() {
		const [css, crayola] = await Promise.all([
			fetch(this._buildPaletteQueryStr("css4")).then(cssResponse => cssResponse.json()),
			fetch(this._buildPaletteQueryStr("crayola")).then(crayolaResponse => crayolaResponse.json()),
		]);
		const cssColors = this._generateColorsArr(css.colors, "CSS");
		const crayolaColors = this._generateColorsArr(crayola.colors, "Crayola");
		const colors = cssColors.concat(crayolaColors);
		return colors;
	}

	async fetchItems(colors, page) {
		if (!colors.length) {
			return [];
		}
		const colorsStr = colors
			.map(color => color.name)
			.join("|");
		const queryStr = this._buildQueryStr(this._getItemsMethod, `color=${colorsStr}&page=${page}&per_page=50`);
		const items = await fetch(queryStr);
		return items.json();
	}

	_buildQueryStr(method, paramStr = "") {
		return `${this._baseUrl}?
			method=cooperhewitt.${method}&
			access_token=${this._accessToken}&
			${paramStr}`;
	}

	_buildPaletteQueryStr(paletteName) {
		return this._buildQueryStr(this._getColorsMethod, `palette=${paletteName}`);
	}

	_generateColorsArr(colorsObj, paletteName) {
		return Object
			.entries(colorsObj)
			.reduce((accum, entry) => {
				const [hex, details] = entry;
				const color = new Color(hex, details.name, paletteName);
				accum.push(color);
				return accum;
			}, []);
	}
}