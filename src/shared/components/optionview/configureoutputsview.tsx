import React from 'react';
import { Button } from 'semantic-ui-react';
import { OutputContext, OutputMap } from '../../../OutputProvider';
import { SetupOutputMap } from './configureoutputs';
import { v4 as uuidv4 } from 'uuid';

const ConfigureOutputsView = (props: any) => {
  const { outputMapDict, SetOutputMapDict } = React.useContext(OutputContext);
  const [editingMapId, SetEditingMapId] = React.useState('');

  const generateOutputMapItems = () => {
    const rows = [];
    for (const outputMap in outputMapDict!) {
      // Only show maps that have names
      if (outputMapDict[outputMap].outputName !== '') {
        rows.push(<div>{outputMap}</div>);
      }
    }
    return <div>{rows}</div>;
  };

  const StartEditingOutput = (newOutput: boolean) => {
    if (newOutput) {
      // Create new outputmap in the context.
      const newId = uuidv4();
      SetEditingMapId(newId);
      const newObj: { [outputMapId: string]: OutputMap } = {};
      newObj[newId] = new OutputMap(editingMapId);
      SetOutputMapDict({ ...outputMapDict, ...newObj });
    }
    props.setIsEditingOutput(true);
  };

  // Editing the output
  if (props.isEditingOutput) {
    return (
      <SetupOutputMap
        setIsEditingOutput={props.setIsEditingOutput}
        editingMapId={editingMapId}
        arcView={props.arcView}
        onSetupOutputComplete={props.onSetupOutputComplete}
      ></SetupOutputMap>
    );
  }
  // END Editing the output

  // View all of the outputs

  return (
    <div>
      {generateOutputMapItems()}
      <Button onClick={() => StartEditingOutput(true)}>Add New Output</Button>
    </div>
  );
};

export default ConfigureOutputsView;
