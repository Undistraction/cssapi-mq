import { complement, compose, and, or, both, either } from 'ramda';

export const nand = complement(and);
export const nor = complement(or);
export const notBoth = compose(complement, both);
export const neither = compose(complement, either);
