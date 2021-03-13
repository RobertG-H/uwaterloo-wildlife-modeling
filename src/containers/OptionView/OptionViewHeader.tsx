import React from 'react';
import './optionViewStyle.css';
import helpIcon from '../../assets/icons/light-icons/help-light.png';
import xIcon from '../../assets/icons/light-icons/save-light.png';

interface Props {
  title: string;
  onClose(): void;
}

const OptionViewHeader = (props: Props) => {
  const onXClick = () => {
    props.onClose();
  };

  return (
    <div className='option-view-header'>
      <div>{props.title}</div>
      <div>
        <img src={helpIcon} width={24} height={24} className='hover-pointer option-view-header-help-icon' />
        <img src={xIcon} width={24} height={24} className='hover-pointer' onClick={onXClick} />
      </div>
    </div>
  );
};

export default OptionViewHeader;
