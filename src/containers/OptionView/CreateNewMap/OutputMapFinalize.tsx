import React from 'react';
import { Checkbox, Input, Button } from 'semantic-ui-react';

import './createNewMapStyle.css';

interface Props {
  initName: string;
  onNameInput(newName: string): void;
  onGenerateHotspotMap(arcResId: string): void;
}

const OutputMapFinalize = (props: Props) => {
  const [name, setName] = React.useState(props.initName);

  const onOutputNameChange = (event: any, data: any) => {
    setName(data.value);
    props.onNameInput(data.value);
  };

  // TODO add this
  const checkDisableGenerateMapButton = (name: string) => {
    // if (name.length === 0) setDisableGenerateMap(true);
    // if (name.charAt(0) === '1' || name.charAt(0) === '2') setDisableGenerateMap(false);
    // else setDisableGenerateMap(true);
  };

  const onGenerateClick = () => {
    if (name.charAt(0) === '1') {
      props.onGenerateHotspotMap('0');
    }
    if (name.charAt(0) === '2') {
      props.onGenerateHotspotMap('1');
    }
  };

  return (
    <div className='output-map-finalize'>
      <Checkbox label='Road Mortality Hotspot Map' defaultChecked={true} />
      <Checkbox label='Connectivity Map' defaultChecked={true} />
      <h3>Output Name</h3>
      <Input value={name} fluid size={'large'} placeholder='Enter a name for the output' onChange={onOutputNameChange}></Input>
      <Button onClick={onGenerateClick}>GENERATE</Button>
    </div>
  );
};

export default OutputMapFinalize;
