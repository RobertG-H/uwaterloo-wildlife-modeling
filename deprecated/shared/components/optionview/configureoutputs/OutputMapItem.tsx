import React from 'react';
import { Divider, Dropdown } from 'semantic-ui-react';
import { OutputContext, OutputMap } from '../../../../../OutputProvider';
import { v4 as uuidv4 } from 'uuid';

const OutputMapItem = (props: any) => {
  const { outputMapDict, SetOutputMapDict } = React.useContext(OutputContext);

  const onDuplicate = () => {
    const newOutput: { [outputMapId: string]: OutputMap } = {};
    const newId = uuidv4();
    newOutput[newId] = JSON.parse(JSON.stringify(outputMapDict![props.outputMapId]));
    newOutput[newId].outputName = newOutput[newId].outputName + ' (1)';
    SetOutputMapDict({
      ...outputMapDict,
      ...newOutput,
    });
  };

  const onEdit = () => {
    props.StartEditingOutput(false, props.outputMapId);
  };

  return (
    <>
      <div style={{ textAlign: 'left', paddingLeft: 10, display: 'flex' }}>
        <h5 style={{ flex: 1, marginBottom: 0 }}>{props.outputName}</h5>
        <div style={{ paddingRight: 5 }}>
          <Dropdown compact icon='ellipsis vertical'>
            <Dropdown.Menu>
              <Dropdown.Item text='Edit' onClick={onEdit}></Dropdown.Item>
              <Dropdown.Item text='Rename'></Dropdown.Item>
              <Dropdown.Item text='Duplicate' onClick={onDuplicate}></Dropdown.Item>
              <Dropdown.Item text='Delete'></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Divider></Divider>
    </>
  );
};

export default OutputMapItem;
