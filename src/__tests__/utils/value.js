import { isNumberWithUnit } from '../../utils/value';

describe.only('utils', () => {
  const validValues = [
    0,
    -0,
    0.8,
    -4,
    -1.9,
    22,
    '14',
    '14em',
    '-12rem',
    '-12.9em',
    '0px',
    '0.5px',
    '-0.5rem',
    '10000rem',
    '44px',
  ];
  const invalidValues = ['12dpi', '10000 ', '10000 ', '0.'];
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
