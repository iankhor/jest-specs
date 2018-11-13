import request from './../request'
jest.mock('./../request')

describe('request', () => {
  describe('mocking', () => {
    test('is not using real request', async () => {
      expect.assertions(1);
      const response = await request('abc');

      expect(response).not.toBe('real request: abc')
    })

    test('is using the mocked version of the request', async () => {
      expect.assertions(1);
      const response = await request('abc');

      expect(response).toBe('mocked request: abc')
    })
  })
})
