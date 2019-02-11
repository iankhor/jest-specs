import React from 'react'
import fakeAxios from 'axios'
import FetchData from './../FetchData'
import { shallow } from 'enzyme'

describe('FetchData', () => {

  let component;

  beforeEach(() => jest.clearAllMocks())

  it('renders', () => {
    component = shallow(<FetchData url="www.dummy.com"/>)

    expect(component).toHaveLength(1)
  })

  it('fetches data from url', done => {
    fakeAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: [1,2,3] })
    })

    component = shallow(<FetchData url="www.dummy.com"/>)

    process.nextTick(() => {
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
      expect(fakeAxios.get).toHaveBeenCalledWith(
        'www.dummy.com', { fakeId: 1, fakeQuery: 'abc' }
      )
      expect(component.state().data).toEqual([1,2,3])

      done();
    })
  })
})