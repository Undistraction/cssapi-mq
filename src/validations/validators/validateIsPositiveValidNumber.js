import { andValidator, validateIsValidNumber } from 'folktale-validations'
import { validateIsPositive } from 'folktale-validations/lib/validators/predicate/generatedPredicateValidators'

export default andValidator(validateIsValidNumber, validateIsPositive)
