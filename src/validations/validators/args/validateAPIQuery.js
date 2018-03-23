import { validateObjectWithConstraints } from 'folktale-validations'
import { API_QUERY } from '../../../constraints'

export default v => validateObjectWithConstraints(API_QUERY)(v)
