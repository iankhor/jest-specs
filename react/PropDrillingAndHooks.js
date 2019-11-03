import React, { createContext, useContext } from 'react';

const Context = createContext();

const OuterChild = ({ propDrillInnerChildValue }) => {
  const { contextInnerChildValue } = useContext(Context);

  return (
    <div id="outer-child">
      <InnerChild propDrillInnerChildValue={propDrillInnerChildValue} contextInnerChildValue={contextInnerChildValue} />
    </div>
  );
};

const InnerChild = ({ contextInnerChildValue }) => {
  return <div id="inner-child">{contextInnerChildValue}</div>;
};

const PropDrillingAndHooksContainer = ({ propDrillInnerChildValue, contextInnerChildValue }) => {
  return (
    <Context.Provider value={{ contextInnerChildValue }}>
      <OuterChild propDrillInnerChildValue={propDrillInnerChildValue} />
    </Context.Provider>
  );
};

export default PropDrillingAndHooksContainer;
