import { mkdir, rmdir, readFile, writeFile } from "node:fs/promises";

const U = () => undefined;

const MKDIR = ($) => mkdir($, { recursive: true }).catch(U);
const RMDIR = ($) => rmdir($, { recursive: true }).catch(U);

const build = () =>
	MKDIR("bin")
		.then(() => readFile("./node_modules/mdlcfg/bin/index.js"))
		.then((data) => writeFile("./bin/index.js", data))

const prune = () => RMDIR("bin");

export default { build, prune };
