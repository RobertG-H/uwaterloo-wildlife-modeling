import initialState from '../initialstates/arcInititialState';
import { AUTHACTIONTYPES, ARC_ADD_MAP, ARC_ADD_MAPVIEW } from '../../constants/actionTypes';
import { sortAndDeduplicateDiagnostics } from 'typescript';

const arc = (state: typeof initialState, action: AUTHACTIONTYPES) => {
  switch (action.type) {
    case ARC_ADD_MAP:
      return {
        ...state,
        arcMap: action.payload,
      };
    case ARC_ADD_MAPVIEW:
      return {
        ...state,
        arcMapView: action.payload,
      };
    default:
      return state;
  }
};

export default arc;
