import React from 'react';
import './optionViewStyle.css';

// interface Props {}

const OptionViewHeader = (props: any) => {
  return (
    <div className='option-view-header'>
      <div>{props.title}</div>
      <div>?</div>
      <div>X</div>
    </div>
  );
};

export default OptionViewHeader;
