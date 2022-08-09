/** @format */

import * as numberFunctions from "./utils.number";
import * as searchFunctions from "./utils.search";
import * as urlFunctions from "./utils.url";
import * as alertFunctions from "./utils.alert";
import * as fileFunctions from "./utils.file";

export const utils = {
	...numberFunctions,
	...searchFunctions,
	...urlFunctions,
	...alertFunctions,
	...fileFunctions,
};
