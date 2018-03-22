import { compose } from 'ramda'
import { validateObjectWithConstraints } from 'folktale-validations'
import { constraintsForRangedFeature } from '../constraints'

export default compose(
  validateObjectWithConstraints,
  constraintsForRangedFeature
)
