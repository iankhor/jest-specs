import React from 'react';
import PropDrillingAndHooksContainer from '../PropDrillingAndHooks';
import { mount } from 'enzyme';

describe('context', () => {
  let component;

  beforeEach(() => (component = mount(<PropDrillingAndHooksContainer contextInnerChildValue="456" propDrillInnerChildValue="123" />)));

  it('PropDrillingAndHooksContainer has OuterChild', () => {
    expect(component.find('PropDrillingAndHooksContainer OuterChild').exists()).toEqual(true);
  });

  it('OuterChild has InnerChild', () => {
    expect(component.find('OuterChild InnerChild').exists()).toEqual(true);
  });

  describe('props drilling', () => {
    it('passes propDrillInnerChildValue props via OuterChild', () => {
      expect(component.find('OuterChild').props().propDrillInnerChildValue).toEqual('123');
    });
    it('innerChild has prop value propDrillInnerChildValue', () => {
      expect(component.find('OuterChild InnerChild').props().propDrillInnerChildValue).toEqual('123');
    });
  });

  describe('useContext', () => {
    it('is not passed to innerChildValue props via OuterChild', () => {
      expect(component.find('OuterChild').props().contextInnerChildValue).toEqual(undefined);
    });
    it('innerChild has prop value innerChildValue', () => {
      expect(component.find('OuterChild InnerChild').props().contextInnerChildValue).toEqual('456');
    });
  });
});
