import React from 'react';
import './createNewMapStyle.css';

interface Props {
  children: React.ReactNode;
}

const StepInput = (props: Props) => {
  return (
    <div className='overflow-wrapper flex-item'>
      <div className='overflow-inner'>{props.children}</div>
    </div>
  );
};

export default StepInput;
