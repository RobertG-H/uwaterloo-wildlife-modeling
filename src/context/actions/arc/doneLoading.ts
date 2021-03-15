import { ARC_DONE_LOADING } from '../../../constants/actionTypes';

export default () => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: ARC_DONE_LOADING,
  });
};
