import { keys } from 'ramda';
import { MEDIA_TYPES } from './const';

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const throwError = message => {
  throw new Error(message);
};

export const missingBreakpointErrorMessage = (breakpoints, name) =>
  `There is no breakpoint defined called '${name}', only: '${keys(
    breakpoints
  )}' are defined.`;

export const sameBreakpointsForBetweenErrrorMessage = name =>
  `You must supply two different breakpoints to 'widthBetween' but both were: '${
    name
  }'.`;

export const invalidMediaTypeErrorMessage = suppliedMediaTypes =>
  `You must supply valid media types from: ('${
    MEDIA_TYPES
  }) but you supplied: '${suppliedMediaTypes}'`;
