import {mkdir, rmdir, readFile, writeFile} from 'node:fs/promises'

const N = () => undefined

const MKDIR = $ => mkdir($, {recursive: true}).catch(N)
const RMDIR = $ => rmdir($, {recursive: true}).catch(N)


const build = ({}) => 
    MKDIR('bin')
    .then(() =>
        readFile('./node_modules/mdlcfg/bin/index.js')
    )
    .then(data =>
        writeFile('./bin/index.js', data)
    )

const prune = ({}) => 
    RMDIR('bin')

export default {build, prune}