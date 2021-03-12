import React from 'react';
import { Checkbox, Input, Button } from 'semantic-ui-react';

interface Props {
  onGenerateHotspotMap(): void;
}

const OutputMapFinalize = (props: Props) => {
  return (
    <div>
      <Checkbox label='Road Mortality Hotspot Map' />
      <Checkbox label='Connectivity Map' />
      <h3>Output Name</h3>
      <Input></Input>
      <Button onClick={props.onGenerateHotspotMap}>GENERATE</Button>
    </div>
  );
};

export default OutputMapFinalize;
