import { compose } from 'ramda'
import { validateObjectWithConstraints } from 'folktale-validations'
import { constraintsForLinearFeature } from '../constraints'

export default compose(
  validateObjectWithConstraints,
  constraintsForLinearFeature
)
