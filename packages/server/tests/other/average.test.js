const average = require('../../utils/test_helpers/for_testing').average

describe('average', () => {
  it('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  it('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  it('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
