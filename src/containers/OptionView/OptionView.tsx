import React from 'react';
import './optionViewStyle.css';
import OptionViewHeader from './OptionViewHeader';

// interface Props {}

const OptionView = (props: any) => {
  return (
    <div className='option-view'>
      <OptionViewHeader title='Output Map Setup' />
    </div>
  );
};

export default OptionView;
