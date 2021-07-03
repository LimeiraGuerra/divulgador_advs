import { LOGIN_UPDATE_USER } from './actionTypes';

export const updateUser = value => ({
    type: LOGIN_UPDATE_USER,
    payload: value
});
