import React from 'react'
import Parent from './../Parent'
import { shallow } from 'enzyme'

describe('Parent', () => {
  let component

  beforeEach(() => {
    component = shallow(<Parent />)
  })

  it('renders', () => {
    expect(component).toHaveLength(1)
  })

  describe('Child', () => {
    it('renders', () => {
      expect(component.find('Child')).toHaveLength(1)
    })

    it('updates childValue if clicked on', () => {
      component.find('Child').dive().find('input[id="click"]').simulate('click')

      expect(component.state().childValue).toEqual(true)
    })

    it('updates asyncResponse if clicked on', (done) => {
      component.find('Child').dive().find('input[id="async-click"]').simulate('click')

      process.nextTick(() => {
        expect(component.state().asyncResponse).toEqual('real request: mojo')
        done()
      })
    })
  })
})
