import React from 'react';
import { Button, Segment, Header, Input } from 'semantic-ui-react';

interface Props {
  initExtent: number[];
  onInput(newExtent: number[]): void;
}

const ExtentSelect = (props: Props) => {
  const [extent, setExtent] = React.useState([0, 0, 0, 0]);

  const onExtentInputChange = (event: any, data: any) => {
    const newExtent = extent.slice();
    newExtent[data.index] = parseInt(data.value);
    setExtent(newExtent);
    props.onInput(newExtent);
    return;
  };

  React.useEffect(() => {
    setExtent(props.initExtent);
  }, [props.initExtent]);

  return (
    <Segment>
      <Header as='h5'>Specified Extent</Header>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
        <span style={{ margin: 'auto' }}>
          <span style={{ marginRight: 5 }}>Top: &nbsp; &nbsp; &nbsp; &nbsp; </span>
          <Input type='number' size='mini' style={{ maxWidth: 100 }} onChange={onExtentInputChange} value={extent[0]} index={0}></Input>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
        <span style={{ marginRight: 'auto' }}>
          <span style={{ marginRight: 5 }}>Left: </span>
          <Input type='number' size='mini' style={{ maxWidth: 100 }} onChange={onExtentInputChange} value={extent[1]} index={1}></Input>
        </span>
        <span style={{ marginLeft: 'auto' }}>
          <span style={{ marginRight: 5 }}>Right: </span>

          <Input type='number' size='mini' style={{ maxWidth: 100 }} onChange={onExtentInputChange} value={extent[2]} index={2}></Input>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
        <span style={{ margin: 'auto' }}>
          <span style={{ marginRight: 5 }}>Bottom: </span>
          <Input type='number' size='mini' style={{ maxWidth: 100 }} onChange={onExtentInputChange} value={extent[3]} index={3}></Input>
        </span>
      </div>
    </Segment>
  );
};

export default ExtentSelect;
