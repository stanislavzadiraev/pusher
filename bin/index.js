#!/usr/bin/env node

process.removeAllListeners("warning");

const log = ($) => (console.log($), $);

const N = () => ({});

const NEST = ($) => new Array($).fill("../").join("");

const curpath = NEST(1);
const parpath = NEST(3);

const theslug =
	//  "src";
	"dst";

Promise.all([
	import(curpath + "package.json", { assert: { type: "json" } }).then(
		({ default: { name } }) => name
	),
	import(parpath + "package.json", { assert: { type: "json" } }).then(
		({ default: { name } }) => name
	),
])
	.then(
		([curname, parname]) => (
			(process.title = [process.title, parname, curname].join(" - ")),
			Promise.all([
				import(curpath + theslug + "/index.js").catch(N),
				import(parpath + curname + ".config.js").catch(N),
			])
		)
	)
	.then(([{ default: mdl }, { default: cfg }]) =>
		process.argv.slice(2).reduce((acc, cur) => acc[cur], log(mdl))(log(cfg))
	);
