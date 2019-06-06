import request from './../request'
jest.mock('./../request')

const asyncFailedRequest = jest.fn(() => {
  return Promise.reject('boom');
})

const asyncSuccessRequest = jest.fn(() => {
  return Promise.resolve('yay');

})

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

    describe('Promises', () => {
      describe('Rejected', () => {
        test('for false positives', () => {
          // this triggers an unhandle promise reject, with test passing as a false positive
          expect(asyncFailedRequest()).resolves.toEqual({})
          expect(asyncFailedRequest()).resolves.toEqual(undefined)
        })

        test('rejects with error message', () => {
          // returns promise and assert promise rejections, with test passing correctly
          return expect(asyncFailedRequest()).rejects.toEqual('boom')
        })

      })

      describe('Resolves', () => {
        test('success', async () => {
          expect(await asyncSuccessRequest()).toEqual('yay')
          expect(asyncSuccessRequest()).resolves.toEqual('yay')
        })
      })
    })
  })
})
