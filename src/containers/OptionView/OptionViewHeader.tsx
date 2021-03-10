import React from 'react';
import './optionViewStyle.css';

// interface Props {}

const OptionViewHeader = (props: any) => {
  return (
    <div className='option-view-header'>
      <span>
        <h1>{props.title}</h1>
      </span>
      <span>?</span>
      <span>X</span>
    </div>
  );
};

export default OptionViewHeader;
