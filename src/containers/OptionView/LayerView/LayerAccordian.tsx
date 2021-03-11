import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

interface Props {
  children: React.ReactNode;
  title: string;
}

const LayerAccordian = (props: Props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleClick = (event: any, data: any) => {
    const index = data!.index;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <div className='layer-accordian'>
      <Accordion>
        <Accordion.Title className='layer-accordian-title' active={activeIndex === 0} index={0} onClick={handleClick}>
          <div>
            {props.title} <Icon name='dropdown' />
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>{props.children}</Accordion.Content>
      </Accordion>
    </div>
  );
};

export default LayerAccordian;
