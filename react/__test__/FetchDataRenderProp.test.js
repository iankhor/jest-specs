import React from 'react'
import fakeAxios from 'axios'
import FetchDataRenderProp from '../FetchDataRenderProp'
import { shallow } from 'enzyme'

jest.mock('axios', () => ({ get: jest.fn(() => Promise.resolve({ data: {} })) }))

describe('FetchDataRenderProp', () => {
	let component

	beforeEach(() => jest.clearAllMocks())

	it('renders with a render prop function', () => {
		component = shallow(<FetchDataRenderProp render={() => {}} />)

		expect(component).toHaveLength(1)
	})

	it('fetches data from url', (done) => {
		fakeAxios.get.mockImplementationOnce(() => {
			return Promise.resolve({ data: [1, 2, 3] })
		})

		component = shallow(<FetchDataRenderProp url="www.dummy.com" render={() => {}} />)

		process.nextTick(() => {
			expect(fakeAxios.get).toHaveBeenCalledTimes(1)
			expect(fakeAxios.get).toHaveBeenCalledWith('www.dummy.com', { fakeId: 1, fakeQuery: 'abc' })
			expect(component.state().data).toEqual([1, 2, 3])

			done()
		})
	})

	it('passes data to its children', (done) => {
		fakeAxios.get.mockImplementationOnce(() => {
			return Promise.resolve({ data: [4, 5, 6] })
		})

		const DummyComponent = () => <div></div>

		component = shallow(<FetchDataRenderProp render={(data) => <DummyComponent displayData={data} />} />)

		process.nextTick(() => {
			expect(component.children().props().displayData).toEqual([4, 5, 6])

			done()
		})
	})
})
