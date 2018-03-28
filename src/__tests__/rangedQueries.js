import { mqWithValidBreakpointsForRange } from './testHelpers/data'

describe(`rangedQueries`, () => {
  it(`generates ranged queries`, () => {
    const mq = mqWithValidBreakpointsForRange(`width`)
    const result = mq.queryAboveWidth(`medium`)``
    expect(result).toMatchSnapshot()
  })
})
