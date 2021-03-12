import React from 'react';

interface Props {
  title: string;
  content: string;
}

const StepText = (props: Props) => {
  return (
    <div>
      <div className='step-text-title'>{props.title}</div>
      <div className='step-text-content'>{props.content}</div>
    </div>
  );
};

export default StepText;
