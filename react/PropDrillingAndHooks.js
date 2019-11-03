import React from 'react';

const OuterChild = ({ innerChildValue }) => {
  return (
    <div id="outer-child">
      <InnerChild innerChildValue={innerChildValue} />
    </div>
  );
};

const InnerChild = () => {
  return <div id="inner-child"></div>;
};

const PropDrillingAndHooksContainer = ({ innerChildValue }) => {
  return <OuterChild innerChildValue={innerChildValue} />;
};

export default PropDrillingAndHooksContainer;
