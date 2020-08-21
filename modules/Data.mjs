import { Color } from "./Color.mjs";

export class Data {
	baseUrl = "https://api.collection.cooperhewitt.org/rest/";
	accessToken = process.env.API_KEY;
	getColorsMethod = "colors.palettes.getInfo";
	getItemsMethod = "search.objects";

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

	async fetchItems(colors) {
		if (!colors.length) {
			return [];
		}
		const colorsStr = colors
			.map(color => color.name)
			.join("|");
		const queryStr = this._buildQueryStr(this.getItemsMethod, `color=${colorsStr}&page=1&per_page=50`);
		const items = await fetch(queryStr);
		return items.json();
	}

	_buildQueryStr(method, paramStr = "") {
		return `${this.baseUrl}?
			method=cooperhewitt.${method}&
			access_token=${this.accessToken}&
			${paramStr}`;
	}

	_buildPaletteQueryStr(paletteName) {
		return this._buildQueryStr(this.getColorsMethod, `palette=${paletteName}`);
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