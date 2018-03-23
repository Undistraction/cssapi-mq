import toCSS from './toCSS'

export default {
  test: () => true,
  // TODO would be nice to use the default serializer if val is an error
  // string so it isn't formatted by toCSS.
  print: toCSS,
}
