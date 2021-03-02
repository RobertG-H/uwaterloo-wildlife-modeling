import React from 'react';
import { ChangeEvent } from 'react';
import { Divider, Input } from 'semantic-ui-react';
import { OutputContext } from '../../../../../OutputProvider';

const HabitatQualityRow = (props: any) => {
  const { outputMapDict } = React.useContext(OutputContext);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(outputMapDict![props.editingMapId].habitatQualityValues[props.landCover]);
  }, []);

  const onInputChange = (event: ChangeEvent, data: any) => {
    setValue(data.value);
    if (data.value && Object.keys(outputMapDict!).length > 0) {
      outputMapDict![props.editingMapId].habitatQualityValues[props.landCover] = data.value;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '2 0 auto', paddingTop: 5 }}>{props.landCover}</div>
        <Input
          type='number'
          size='mini'
          style={{ marginLeft: 'auto', paddingRight: 10, maxWidth: 80 }}
          onChange={onInputChange}
          value={value}
        ></Input>
      </div>
      <Divider></Divider>
    </div>
  );
};

export default HabitatQualityRow;
