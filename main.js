"use strict";

import { App } from "./modules/App.mjs";
import { replace } from "feather-icons";

// Enable icon set
replace();

// Boot app
const app = new App();
app.init();
