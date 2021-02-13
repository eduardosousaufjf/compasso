import { AxiosAPI } from 'app/utils/AxiosAPI';
import { AxiosAPIInterface } from 'app/utils/AxiosAPIInterface';

export const GlobalConfig = {
  API_URL_BASE: 'https://api.github.com/'
};

export const GlobalAxios: AxiosAPIInterface = new AxiosAPI();


