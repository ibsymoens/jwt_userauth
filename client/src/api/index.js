import axios from 'axios';
import * as apiTypes from '../constants/apiTypes';

const API = axios.create({ baseURL: apiTypes.BASE_URL });

export const signin = (formData) => API.post(apiTypes.USER_SIGNIN, formData);
export const signup = (formData) => API.post(apiTypes.USER_SIGNUP, formData);