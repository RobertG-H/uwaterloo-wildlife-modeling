import LegendViewModel from '@arcgis/core/widgets/Legend/LegendViewModel';

import { ARC_ADD_LEGEND_VM } from '../../../constants/actionTypes';

export default (newLegendVm: LegendViewModel) => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: ARC_ADD_LEGEND_VM,
    payload: newLegendVm,
  });
};
