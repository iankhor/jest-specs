import React from 'react';
import PropDrillingAndHooksContainer from '../PropDrillingAndHooks';
import { mount } from 'enzyme';

describe('context', () => {
  let component;

  beforeEach(() => (component = mount(<PropDrillingAndHooksContainer innerChildValue="123" />)));

  it('PropDrillingAndHooksContainer has OuterChild', () => {
    expect(component.find('PropDrillingAndHooksContainer OuterChild').exists()).toEqual(true);
  });

  it('OuterChild has InnerChild', () => {
    expect(component.find('OuterChild InnerChild').exists()).toEqual(true);
  });

  describe('props drilling', () => {
    it('passes innerChildValue props via OuterChild', () => {
      expect(component.find('OuterChild').props().innerChildValue).toEqual('123');
    });
    it('innerChild has prop value innerChildValue', () => {
      expect(component.find('OuterChild InnerChild').props().innerChildValue).toEqual('123');
    });
  });
});
