import React from 'react';
import { Input } from 'semantic-ui-react';

interface Props {
  title: string;
  region: number;
  initValue: number;
  onUpdate(key: string, newValue: number): void;
}

const FactorRow = (props: Props) => {
  const [value, setValue] = React.useState(props.initValue);

  const onInputChange = (event: any, data: any) => {
    setValue(data.value);
    props.onUpdate(props.title, data.value);
  };
  return (
    <tr className='factor-row'>
      <td>{props.title}</td>
      <td>{props.region}%</td>
      <td>
        <Input type='number' size='mini' style={{ maxWidth: 50 }} onChange={onInputChange} value={value}></Input>
      </td>
    </tr>
  );
};

export default FactorRow;
