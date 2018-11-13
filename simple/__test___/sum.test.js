import sum from './../sum'

describe('sum', () => {
  let summation

  beforeEach(() => {
    summation = sum(1,2)
  })

  test('summation', () => {
    expect(summation).toBe(3); //strict equality
  })
})
