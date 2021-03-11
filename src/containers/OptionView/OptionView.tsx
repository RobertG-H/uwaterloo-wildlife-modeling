import React from 'react';
import './optionViewStyle.css';
import OptionViewHeader from './OptionViewHeader';

interface Props {
  headerTitle: string;
  children: React.ReactNode;
}

const OptionView = (props: Props) => {
  return (
    <div className='option-view'>
      <OptionViewHeader title={props.headerTitle} />
      {props.children}
    </div>
  );
};

export default OptionView;
