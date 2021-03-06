import React from 'react'
import Parent, { Child } from './../Parent'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

describe('Parent', () => {
  let component
  let someFunction = jest.fn()

  beforeEach(() => component = shallow(<Parent someFunction={someFunction}/>))

  it('renders', () => expect(component).toHaveLength(1))

  describe('someFunction', () => {
    describe('when input element is clicked once', () => {
      afterEach(() => someFunction.mockReset())

      it('called once', () => {
        component.find('input[id="click"]').simulate('click')

        expect(someFunction).toHaveBeenCalledTimes(1);
      })
    })

    describe('when input element is clicked twice', () => {
      it('called twice', () => {
        component.find('input[id="click"]').simulate('click')
        component.find('input[id="click"]').simulate('click')

        expect(someFunction).toHaveBeenCalledTimes(2);
      })
    })
  })

  describe('Child', () => {
    let childComponent

    beforeEach(() => childComponent = component.find('Child').dive())

    it('renders', () => expect(component.find('Child')).toHaveLength(1))

    it('updates childValue if clicked on', () => {
      childComponent.find('input[id="child-click"]').simulate('click')

      expect(component.state().childValue).toEqual(true)
    })

    it('updates asyncResponse if clicked on', (done) => {
      childComponent.find('input[id="child-async-click"]').simulate('click')

      process.nextTick(() => {
        expect(component.state().asyncResponse).toEqual('real request: mojo')
        done()
      })
    })

    describe('snapshot testing', () => {
      const tree = renderer.create(<Child />).toJSON();

      expect(tree).toMatchSnapshot();
    })
  })

  describe('grandChild', () => {
    let grandChildComponent

    beforeEach(() => grandChildComponent = component.find('Child').dive().find('GrandChild'))

    it('renders', () => expect(component.find('Child').dive().find('GrandChild')).toHaveLength(1))

    it('updates grandChildValue if clicked on', () => {
      grandChildComponent.dive().find('input[id="grand-child-click"]').simulate('click')

      expect(component.state().grandChildValue).toEqual(3)
    })
  })
})
