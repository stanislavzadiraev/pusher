import { mkdir, rmdir, readFile, writeFile, copyFille } from "node:fs/promises";

const U = () => undefined;

const MKDIR = ($) => mkdir($, { recursive: true }).catch(U);
const RMDIR = ($) => rmdir($, { recursive: true }).catch(U);

const editjson = (name, data) =>
	readFile(name)
		.then((data) => JSON.parse(data))
		.then((json) =>
			JSON.stringify(
				(Object.entries(data).map(
					(ent) =>
						(ent[1] == undefined && (delete json[ent[0]], true)) ||
						((json[ent[0]] = ent[1]), true)
				),
				json),
				null,
				2
			)
		);

const build = () =>
	MKDIR("bin")
		.then(() => readFile("./node_modules/mdlcfg/bin/index.js"))
		.then((data) => writeFile("./bin/index.js", data))
		.then(() => editjson("./package.json", { bin: "bin/index.js" }));

const prune = () =>
	RMDIR("bin").then(() => editjson("./package.json", { bin: undefined }));

export default { build, prune };
