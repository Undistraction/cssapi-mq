import {
  isPositiveNumberWithDimensionsUnit,
  isPositiveIntegerOrZero,
} from '../../utils/predicates';

describe('utils', () => {
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
});
