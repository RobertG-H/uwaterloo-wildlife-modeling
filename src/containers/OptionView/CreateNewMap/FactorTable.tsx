import React from 'react';
import FactorRow from './FactorRow';
import './createNewMapStyle.css';
import { LAND_COVER_LEGEND_COLORS } from '../../../constants/staticArcResources';

import { factory } from 'typescript';

interface Props {
  title: string;
  factorValues: { [key: string]: number[] };
  showImage: boolean;
}

const FactorTable = (props: Props) => {
  const generateRows = () => {
    const rows: JSX.Element[] = [];
    Object.keys(props.factorValues).forEach(key => {
      let legendSrc = 'empty';
      if (props.showImage) {
        legendSrc = LAND_COVER_LEGEND_COLORS[key];
      }
      rows.push(
        <FactorRow
          title={key}
          region={props.factorValues[key][0]}
          initValue={props.factorValues[key][1]}
          onUpdate={setFactorValue}
          legendSrc={legendSrc}
          showImage={props.showImage}
        />,
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
      <tbody>
        <tr className='factor-table-header'>
          <th>{props.title}</th>
          <th>% OF REGION</th>
          <th>VALUE</th>
        </tr>
        {generateRows()}
      </tbody>
    </table>
  );
};

export default FactorTable;
