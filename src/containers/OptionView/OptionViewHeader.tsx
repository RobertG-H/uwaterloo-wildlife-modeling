import React from 'react';
import { Confirm } from 'semantic-ui-react';
import './optionViewStyle.css';
import helpIcon from '../../assets/icons/light-icons/help-light.png';
import xIcon from '../../assets/icons/general-icons/close.png';

interface Props {
  title: string;
  onClose(): void;
}

const OptionViewHeader = (props: Props) => {
  const [modalActive, setModalActive] = React.useState(false);

  const onCloseModal = () => {
    setModalActive(false);
  };

  const onOpenModal = () => {
    setModalActive(true);
  };

  const onXClick = () => {
    props.onClose();
  };

  return (
    <div className='option-view-header'>
      <div>{props.title}</div>
      <div>
        <img src={helpIcon} width={24} height={24} className='hover-pointer option-view-header-help-icon' onClick={onOpenModal} />
        <img src={xIcon} width={24} height={24} className='hover-pointer' onClick={onXClick} />
      </div>
      <Confirm
        header='Help Info Coming Soon'
        content='This section is not complete yet'
        open={modalActive}
        cancelButton='Cancel'
        confirmButton='Okay!'
        onCancel={onCloseModal}
        onConfirm={onCloseModal}
        size='mini'
      />
    </div>
  );
};

export default OptionViewHeader;
