import React from 'react';
import { Input } from 'semantic-ui-react';
import './createNewMapStyle.css';

interface Props {
  title: string;
  region: number;
  initValue: number;
  onUpdate(key: string, newValue: number): void;
  legendSrc: string;
  showImage: boolean;
}

const FactorRow = (props: Props) => {
  const [value, setValue] = React.useState(props.initValue);

  const onInputChange = (event: any, data: any) => {
    setValue(data.value);
    props.onUpdate(props.title, data.value);
  };
  return (
    <tr className='factor-row' key={props.title}>
      <td key={props.title + 'title'}>
        <div style={{ display: 'flex', alignContent: 'center' }}>
          {props.showImage && <img src={props.legendSrc} height={20} width={20} style={{ margin: '0px 5px 0px 0px' }} />}
          {props.title}
        </div>
      </td>
      <td key={props.title + 'region'}>{props.region}%</td>
      <td key={props.title + 'input'}>
        <Input
          key={props.title + 'inputelement'}
          type='number'
          size='mini'
          style={{ maxWidth: 50 }}
          onChange={onInputChange}
          value={value}
        ></Input>
      </td>
    </tr>
  );
};

export default FactorRow;
