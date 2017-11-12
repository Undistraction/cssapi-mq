import { css } from 'styled-components';
import './helpers/toEqualCSS';
import mq from '../index';
import cssSerialiser from './helpers/cssSerialiser';

expect.addSnapshotSerializer(cssSerialiser);

const validBreakpoints = {
  small: 400, // 0–400
  medium: 900, // 400–900
  large: 1100, // 900–1100
  xLarge: 1300, // 1100–1300
};

const validMQ = () => mq.configure(validBreakpoints);

describe('aboveWidth', () => {
  it('returns the correct media query', () => {
    const result = validMQ().aboveWidth('small')`
      background-color: ${props => 'GhostWhite'};
    `;
    expect(result).toMatchSnapshot();
  });
});

describe('belowWidth', () => {
  it('returns the correct media query', () => {
    const result = validMQ().belowWidth('small')`
      background-color: ${props => 'GhostWhite'};
    `;
    expect(result).toMatchSnapshot();
  });
});

describe('betweenWidths', () => {
  it('returns the correct media query', () => {
    const result = validMQ().betweenWidths('small', 'medium')`
      background-color: ${props => 'GhostWhite'};
    `;
    expect(result).toMatchSnapshot();
  });
});

describe('atWidth', () => {
  it('returns the correct media query', () => {
    const result = validMQ().atBreakpoint('small')`
      background-color: ${props => 'GhostWhite'};
    `;
    expect(result).toMatchSnapshot();
  });
});
