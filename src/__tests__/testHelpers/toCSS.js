import { compose, trim, replace, ifElse } from 'ramda'
import { isArray } from 'ramda-adjunct'
import cssbeautify from 'cssbeautify'
import { joinWithNoSpace } from '../../utils/string'

const R_GLOBAL_WHITESPACE = /\s\s+/g
const R_GLOBAL_BLANK_LINES = /^\s*\n/gm
const R_GLOBAL_COMMENTS = /^\s*\/\/.*$/gm

const collapseSpaces = replace(R_GLOBAL_WHITESPACE, ` `)
const removeBlankLines = replace(R_GLOBAL_BLANK_LINES, ``)
const removeComments = replace(R_GLOBAL_COMMENTS, ``)

const prepString = compose(cssbeautify, removeBlankLines, collapseSpaces, trim)
const stringifyRules = compose(prepString, removeComments, joinWithNoSpace)

export default ifElse(isArray, stringifyRules, prepString)
