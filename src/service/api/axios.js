import axios from 'axios';
import { accessToken, apiDomain } from '../../const/api-details';

const instance = axios.create({
	baseURL: apiDomain,
	responseType: 'json',
	headers: {
		authorization: 'Bearer ' + accessToken,
	},
});

export const getAxiosInstance = () => instance;
