import get from 'lodash/get';
import { apiUrl } from './constants';

export const getAPIEndpoint = () => {
  const href = get(window, 'location.href', '');
  const isDev = href.indexOf('localhost') > -1;

  return isDev ? apiUrl.dev : apiUrl.prod;
};
