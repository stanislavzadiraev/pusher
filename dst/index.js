import { readFile, writeFile, cp, rm } from "node:fs/promises";

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
		)
		.then((data) => writeFile(name, data));

const build = () =>
	cp("./node_modules/mdlcfg/bin/", "./bin/", { recursive: true })
		.then(() => editjson("./package.json", { bin: "bin/index.js" }));

const prune = () =>
	rm("./bin/", { recursive: true })
		.then(() => editjson("./package.json", { bin: undefined }));

export default { build, prune };
