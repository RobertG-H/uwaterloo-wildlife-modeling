import React from 'react';
import './createNewMapStyle.css';

interface Props {
  children: React.ReactNode;
}

const StepInput = (props: Props) => {
  return (
    <div className='overflow-wrapper flex-item step-input'>
      <div className='overflow-inner'>{props.children}</div>
    </div>
  );
};

export default StepInput;
