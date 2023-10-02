import {mkdir, rmdir} from 'node:fs/promises'

const N = () => undefined

const MKDIR = $ => mkdir($, {recursive: true}).catch(N)
const RMDIR = $ => rmdir($, {recursive: true}).catch(N)

const build = ({}) => 
    MKDIR('bin')

const prune = ({}) => 
    MKDIR('bin')

export default {build, prune}