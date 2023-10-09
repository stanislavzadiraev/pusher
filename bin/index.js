#!/usr/bin/env node

process.removeAllListeners("warning");

const N = () => ({});

const NEST = ($) => new Array($).fill("../").join("");

const theslug =
	//  "src";
	"dst";

Promise.all([
	import(NEST(1) + "package.json", { assert: { type: "json" } }).then(
		({ default: { name } }) => name
	),
	import(NEST(3) + "package.json", { assert: { type: "json" } }).then(
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
		process.argv.slice(2).reduce((acc, cur) => acc && acc[cur], mdl)(cfg)
	);
