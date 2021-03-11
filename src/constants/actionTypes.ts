export interface AUTHACTIONTYPES {
  type: string;
  payload: any;
}
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';
export const ARC_LOGIN_LOADING = 'ARC_LOGIN_LOADING';
export const ARC_LOGIN_SUCCESS = 'ARC_LOGIN_SUCCESS';
export const ARC_LOGIN_ERROR = 'ARC_LOGIN_ERROR';
export const ARC_ADD_MAP = 'ARC_ADD_MAP';
export const ARC_ADD_MAPVIEW = 'ARC_ADD_MAPVIEW';
export const ARC_ADD_DEFAULT_LAYERS = 'ARC_ADD_DEFAULT_LAYERS';
