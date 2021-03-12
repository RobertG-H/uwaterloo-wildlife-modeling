import React from 'react';
import FactorRow from './FactorRow';
import './createNewMapStyle.css';
import { factory } from 'typescript';

interface Props {
  title: string;
  factorValues: { [key: string]: number[] };
}

const FactorTable = (props: Props) => {
  const generateRows = () => {
    const rows: JSX.Element[] = [];
    Object.keys(props.factorValues).forEach(key => {
      rows.push(
        <FactorRow title={key} region={props.factorValues[key][0]} initValue={props.factorValues[key][1]} onUpdate={setFactorValue} />,
      );
    });
    return rows;
  };

  const setFactorValue = (key: string, newValue: number) => {
    const currentValue = props.factorValues[key];
    currentValue[1] = newValue;
    props.factorValues[key] = currentValue;
  };

  return (
    <table className='factor-table'>
      <tr className='factor-table-header'>
        <th>{props.title}</th>
        <th>% OF REGION</th>
        <th>VALUE</th>
      </tr>
      {generateRows()}
    </table>
  );
};

export default FactorTable;
