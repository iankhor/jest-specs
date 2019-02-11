import React from 'react'
import fakeAxios from 'axios'
import FetchDataFunctionAsChildren from './../FetchDataFunctionAsChildren'
import { shallow } from 'enzyme'

describe('FetchDataFunctionAsChildren', () => {

  let component;
  const DummyComponent = () => <div></div>

  beforeEach(() => jest.clearAllMocks())

  it('renders with function as a children', () => {
    component = shallow(<FetchDataFunctionAsChildren>{ () => {} }</FetchDataFunctionAsChildren>)

    expect(component).toHaveLength(1)
  })

  it('fetches data from url', done => {
    fakeAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: [1,2,3] })
    })

    component = shallow(
      <FetchDataFunctionAsChildren url="www.dummy.com">{ () => {} }</FetchDataFunctionAsChildren>
    )

    process.nextTick(() => {
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
      expect(fakeAxios.get).toHaveBeenCalledWith(
        'www.dummy.com', { fakeId: 1, fakeQuery: 'abc' }
      )
      expect(component.state().data).toEqual([1,2,3])

      done();
    })
  })

  it('passes data to its children', done => {
    fakeAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: [4,5,6] })
    })

    component = shallow(
      <FetchDataFunctionAsChildren>
        { data => <DummyComponent displayData={data}/> }
      </FetchDataFunctionAsChildren>
    )

    process.nextTick(() => {
      expect(component.children().props().displayData).toEqual([4,5,6])

      done()
    })
  })
})