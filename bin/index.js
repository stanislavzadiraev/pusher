#!/usr/bin/env node

process.removeAllListeners("warning");

const N = () => {};

const I = " - ";
const C = "../";

const curpath = new Array(1).fill(C).join("");
const parpath = new Array(3).fill(C).join("");

const theslug =
	//  "src";
	"dst";

Promise.all([
	import(curpath + "package.json", { assert: { type: "json" } }),
	import(parpath + "package.json", { assert: { type: "json" } }),
])
	.then(
		([
			{
				default: { name: curname },
			},
			{
				default: { name: parname },
			},
		]) => (
			(process.title = "node" + I + parname + I + curname),
			Promise.all([
				import(curpath + theslug + "/index.js").catch(N),
				import(parpath + curname + ".config.js").catch(N),
			])
		)
	)
	.then(([{ default: mdl = {} }, { default: cfg = {} }]) =>
		process.argv.slice(2).reduce((acc, cur) => acc && acc[cur], mdl)(cfg)
	);
