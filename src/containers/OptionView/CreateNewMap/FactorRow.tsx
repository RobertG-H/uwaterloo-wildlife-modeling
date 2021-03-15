import React from 'react';
import { Input } from 'semantic-ui-react';

interface Props {
  title: string;
  region: number;
  initValue: number;
  onUpdate(key: string, newValue: number): void;
  legendSrc: string;
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
        <img src='https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png' height={20} width={20} />
        {props.title}
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
