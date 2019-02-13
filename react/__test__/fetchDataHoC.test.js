import React from 'react'
import fakeAxios from 'axios'
import fetchDataHoc from '../fetchDataHoc'
import { shallow } from 'enzyme'

describe('fetchDataHoc', () => {
  let component;
  const DummyComponent = () => <div></div>
  const ComponentUnderTest = fetchDataHoc(DummyComponent)

  beforeEach(() => jest.clearAllMocks())

  it('renders', () => {
    component = shallow(<ComponentUnderTest />)

    expect(component).toHaveLength(1)
  })

  it('fetches data from url', done => {
    fakeAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: [1,2,3] })
    })

    component = shallow(<ComponentUnderTest />)

    process.nextTick(() => {
      expect(component.props().data).toEqual([1,2,3])

      done();
    })
  })
})