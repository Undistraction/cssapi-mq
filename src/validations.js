import {
  __,
  is,
  compose,
  both,
  complement,
  contains,
  isEmpty,
  values,
  all,
  gt,
} from 'ramda';
import { MEDIA_TYPES, UNITS } from './const';

const breakpointsWereSupplied = both(complement(isEmpty), is(Object));
const breakpointValuesAreValid = compose(all(is(Number)), values);
const baseFontSizeIsValid = both(is(Number), gt(__, 0));
const defaultMediaTypeIsValid = contains(__, values(MEDIA_TYPES));
const unitIsValid = contains(__, values(UNITS));

export const validateBreakpoints = breakpoints => {
  if (!breakpointsWereSupplied(breakpoints))
    throw new Error(
      "You must supply a breakpoint object with at least one breakpoint to 'configure()'"
    );

  if (!breakpointValuesAreValid(breakpoints))
    throw new Error(
      `You must supply unitless values for each breakpoint but you supplied ${values(
        breakpoints
      )}`
    );
};

export const validateConfig = ({
  baseFontSize,
  defaultMediaType,
  unit,
  separateIfEms,
}) => {
  if (!baseFontSizeIsValid(baseFontSize))
    throw new Error(
      `baseFontSize must be a number, but you supplied '${baseFontSize}'`
    );

  if (!defaultMediaTypeIsValid(defaultMediaType)) {
    throw new Error(
      `'defaultMediaType' must be one of '${values(MEDIA_TYPES)}' but was '${
        defaultMediaType
      }'`
    );
  }

  if (!unitIsValid(unit)) {
    throw new Error(
      `'unit' must be one of '${values(MEDIA_TYPES)}' but was '${unit}'`
    );
  }

  if (!is(Boolean)(separateIfEms)) {
    throw new Error(`'unit' must be a boolean but was '${unit}'`);
  }
};
