import React from 'react';
import { Button } from 'semantic-ui-react';
import { OutputContext, OutputMap } from '../../../OutputProvider';
import { SetupOutputMap, OutputMapItem } from './configureoutputs';
import { v4 as uuidv4 } from 'uuid';

const ConfigureOutputsView = (props: any) => {
  const { outputMapDict, SetOutputMapDict } = React.useContext(OutputContext);
  const [editingMapId, SetEditingMapId] = React.useState('');

  // Editing the output
  if (props.isEditingOutput) {
    return (
      <SetupOutputMap
        setIsEditingOutput={props.setIsEditingOutput}
        editingMapId={editingMapId}
        isEditingExistingOutput={props.isEditingExistingOutput}
        setIsEditingExistingOutput={props.setIsEditingExistingOutput}
        arcView={props.arcView}
        onSetupOutputComplete={props.onSetupOutputComplete}
      ></SetupOutputMap>
    );
  }
  // END Editing the output

  // View all of the outputs

  const StartEditingOutput = (newOutput: boolean, outputMapId?: string) => {
    if (newOutput) {
      // Create new outputmap in the context.
      const newId = uuidv4();
      SetEditingMapId(newId);
      const newObj: { [outputMapId: string]: OutputMap } = {};
      newObj[newId] = new OutputMap(editingMapId);
      SetOutputMapDict({ ...outputMapDict, ...newObj });
      props.setIsEditingExistingOutput(false);
    } else if (outputMapId) {
      SetEditingMapId(outputMapId);
      props.setIsEditingExistingOutput(true);
    }
    props.setIsEditingOutput(true);
  };

  const generateOutputMapItems = () => {
    const rows = [];
    for (const outputMap in outputMapDict!) {
      // Only show maps that have names
      if (outputMapDict[outputMap].outputName !== '') {
        rows.push(
          <OutputMapItem
            outputMapId={outputMap}
            outputName={outputMapDict[outputMap].outputName}
            StartEditingOutput={StartEditingOutput}
          ></OutputMapItem>,
        );
      }
    }
    return <div>{rows}</div>;
  };
  return (
    <div>
      {generateOutputMapItems()}
      <Button onClick={() => StartEditingOutput(true)}>Add New Output</Button>
    </div>
  );
};

export default ConfigureOutputsView;
