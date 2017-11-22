import { values, drop } from 'ramda';
import { MEDIA_TYPES } from '../const';
import { mqWithValidBreakpointsForRange } from './data';
import cssSerialiser from './helpers/cssSerialiser';

expect.addSnapshotSerializer(cssSerialiser);
const validValues = values(MEDIA_TYPES);

describe('mediaTypes', () => {
  it('returns the correct default media type if called with no arguments', () => {
    expect(
      mqWithValidBreakpointsForRange('width').mediaType()
    ).toMatchSnapshot();
  });

  for (const value of validValues) {
    it(`returns the supplied mediaTypes for '${value}'`, () => {
      expect(
        mqWithValidBreakpointsForRange('width').mediaType(value)
      ).toMatchSnapshot();
    });
  }

  it('supports multiple values', () => {
    expect(
      mqWithValidBreakpointsForRange('width').mediaType(drop(2, validValues))
    ).toMatchSnapshot();
  });
  const invalidMediaTypes = ['', true, false, 'xxxx', 444, {}, []];

  for (const value of invalidMediaTypes) {
    it(`throws if argument is '${value}'`, () => {
      expect(() =>
        mqWithValidBreakpointsForRange('width').mediaType(value)
      ).toThrowErrorMatchingSnapshot();
    });
  }
});
