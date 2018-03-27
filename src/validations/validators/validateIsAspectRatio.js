import { predicateValidator } from 'folktale-validations'
import { isAspectRatioString } from 'cssjs-units'
import validatorUIDs from '../validatorUIDs'

export default predicateValidator(
  isAspectRatioString,
  validatorUIDs.VALIDATE_IS_ASPECT_RATIO_STRING
)
