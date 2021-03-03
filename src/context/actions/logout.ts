import { LOGOUT_USER } from '../../constants/actionTypes';
import * as H from 'history';

export default (history: H.History) => (dispatch: React.Dispatch<any>) => {
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT_USER,
  });
  history.push('/auth/login');
};
