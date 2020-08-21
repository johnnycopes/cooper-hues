"use strict";

import { App } from "./modules/App.mjs";

const app = new App();
console.log(process.env.API_KEY);
app.init();
