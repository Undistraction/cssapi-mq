import { compose, trim } from 'ramda';

const collapseSpaces = s => s.replace(/\s\s+/g, ' ');

const removeBlankLines = s => s.replace(/^\s*\n/gm, '');

export default rules => {
  compose(removeBlankLines, collapseSpaces, trim)(rules);
};
