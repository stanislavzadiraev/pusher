import { mkdir, rmdir, readFile, writeFile } from "node:fs/promises";

const U = () => undefined;

const MKDIR = ($) => mkdir($, { recursive: true }).catch(U);
const RMDIR = ($) => rmdir($, { recursive: true }).catch(U);

const build = () =>
	MKDIR("bin")
		.then(() => readFile("./node_modules/mdlcfg/bin/index.js"))
		.then((data) => writeFile("./bin/index.js", data))
		.then(() => readFile("./package.json"))
		.then((data) => JSON.parse(data))
		.then((json) => JSON.stringify((json["bin"] = "bin/index.js", json)))
		.then((data) => writeFile("./package.json", data));

const prune = () => 
	RMDIR("bin")
	.then(() => readFile("./package.json"))
	.then((data) => JSON.parse(data))
	.then((json) => JSON.stringify((delete json["bin"], json)))
	.then((data) => writeFile("./package.json", data));
export default { build, prune };
