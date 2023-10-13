import { readFile, writeFile, cp, rm } from 'node:fs/promises'
import { join } from 'node:path'

const editjson = (name, data) =>
	readFile(name)
		.then(data => JSON.parse(data))
		.then(json => JSON.stringify(
			(
				Object.entries(data).map(
					ent =>
						(ent[1] == undefined && (delete json[ent[0]], true)) ||
						((json[ent[0]] = ent[1]), true)
				),
				json
			),
			null,
			2
		))
		.then(data => writeFile(name, data))

const build = () =>
	readFile(new URL(join('..', 'package.json'), import.meta.url))
		.then(data => JSON.parse(data))
		.then(({ bin }) =>
			(!bin && Promise.reject(new Error("bin lost"))) ||
			Promise.resolve({ bin })
		)
		.then(({ bin }) =>
			Promise.all([
				cp(new URL(join('..', 'bin'), import.meta.url), 'bin', { recursive: true }),
				editjson('package.json', { bin }),
			])
		)

const prune = () =>
	Promise.all([
		rm('bin', { recursive: true }),
		editjson('package.json', { bin: undefined }),
	])

export default { build, prune }