const palindrome = require('../../utils/test_helpers/for_testing').palindrome

describe('palindrome', () => {
  it('of a', () => {
    let result = palindrome('a')
    expect(result).toBe('a')
  })

  it('of react', () => {
    let result = palindrome('react')
    expect(result).toBe('tcaer')
  })

  it('of releveler', () => {
    let result = palindrome('releveler')
    expect(result).toBe('releveler')
  })
})
