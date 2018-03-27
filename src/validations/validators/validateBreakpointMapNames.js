import { validateWhitelistedKeys } from 'folktale-validations'
import { values } from 'ramda'
import { BREAKPOINT_MAP_NAMES } from '../../const'

export default validateWhitelistedKeys(values(BREAKPOINT_MAP_NAMES))
