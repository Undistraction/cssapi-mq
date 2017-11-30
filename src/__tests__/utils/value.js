import {
  isNumberWithUnit,
  isPositiveNumberWithDimensionsUnit,
  isPositiveIntegerOrZero,
  isRatioString,
} from '../../utils/predicates';

describe('utils', () => {
  describe('isNumberWithUnit', () => {
    const validValues = [
      '14em',
      '-12rem',
      '-12.9em',
      '0px',
      '0.5px',
      '-0.5rem',
      '10000rem',
      '44px',
    ];
    const invalidValues = [44, '44', '12dpi', '10000 ', '10000 ', '0.'];
    const units = ['rem', 'em', 'px'];
    for (const value of validValues) {
      it(`returns true for valid value '${value}'`, () => {
        expect(isNumberWithUnit(units, value)).toBeTruthy();
      });
    }

    for (const value of invalidValues) {
      it(`returns false for invalid value '${value}'`, () => {
        expect(isNumberWithUnit(units, value)).toBeFalsy();
      });
    }
  });

  describe('isPositiveNumberWithDimensionsUnit', () => {
    const validValues = ['14em', '10px', '16rem'];
    for (const value of validValues) {
      it(`returns true for valid value '${value}'`, () => {
        expect(isPositiveNumberWithDimensionsUnit(value)).toBeTruthy();
      });
    }
  });

  describe('isPositiveIntegerOrZero', () => {
    const validValues = [0, 44, 66, 77];
    for (const value of validValues) {
      it(`returns true for valid value '${value}'`, () => {
        expect(isPositiveIntegerOrZero(value)).toBeTruthy();
      });
    }
  });

  describe('isRatioString', () => {
    const validValues = ['1/4', '12/2', '2/18', '1/1'];
    for (const value of validValues) {
      it(`returns true for valid value '${value}'`, () => {
        expect(isRatioString(value)).toBeTruthy();
      });
    }
  });
});
