import { map } from 'ramda'

export default (tests, name, camelisedName, method, config) => {
  map(test => test(name, camelisedName, method, config))(tests)
}
