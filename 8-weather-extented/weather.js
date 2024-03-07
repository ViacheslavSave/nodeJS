#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {  getForecastALLsity } from "./servises/api.service.js";
import { addlanguage } from "./servises/lang.service.js";
import {  printHelp } from "./servises/log.service.js";
import { deleteSity, saveSity } from "./servises/sity.service.js";
import { saveToken } from "./servises/token.service.js";

//!-------------------
initCLI();
//!-------------------

async function initCLI() {
const args = getArgs();
	if (args.h) {
		printHelp();
	}
	if (args.s) {
		saveSity(args.s);
	}
	if (args.t) {
		saveToken(args.t);
	}
	if (args.d) {
		deleteSity(args.d);
	}
	if (args.l) {
		addlanguage(args.l);
	}
	if (Object.entries(args).length) {
		return;
	}
	getForecastALLsity();
}
