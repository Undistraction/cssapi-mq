import { compose, trim } from 'ramda';
import cssbeautify from 'cssbeautify';
// import Stylis from 'stylis';

// const stylis = new Stylis({
//   global: false,
//   cascade: true,
//   keyframe: false,
//   prefix: true,
//   compress: false,
//   semicolon: true,
// });

const collapseSpaces = s => s.replace(/\s\s+/g, ' ');
const removeBlankLines = s => s.replace(/^\s*\n/gm, '');
const beautify = s => cssbeautify(s);

const prepString = compose(beautify, removeBlankLines, collapseSpaces, trim);

const stringifyRules = rules => {
  const flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, '');
  const trimmedCSS = prepString(flatCSS);
  return trimmedCSS;
};

export default rules => {
  if (Array.isArray(rules)) return stringifyRules(rules);
  return prepString(rules);
};
