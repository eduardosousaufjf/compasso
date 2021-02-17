import axios from 'axios';
import { AxiosAPIInterface } from 'app/utils/AxiosAPIInterface';
import { GlobalConfig } from 'app/config/GlobalConfig';

export class AxiosAPI implements AxiosAPIInterface {

  private axiosInstance = axios.create({
    'baseURL': GlobalConfig.API_URL_BASE
  });

  public constructor() {
    this.axiosInstance.interceptors.request.use((config) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.headers.Accept = 'application/vnd.github.v3+json';
      return config;
    });
  }

  public getData(path: string): Promise<any> {
    return new Promise(
      (accept, reject) => {
        this.axiosInstance.get(path)
          .then(response => accept(response.data))
          .catch(error => reject(error));
      });
  }

  public postData(path: string, data: unknown): Promise<any> {
    return new Promise(
      (accept, reject) => {
        this.axiosInstance.post(path, data)
          .then(response => accept(response.data)
          ).catch(error => reject(error));
      });
  }

  public putData(path: string, data: unknown): Promise<any> {
    return new Promise(
      (accept, reject) => {
        this.axiosInstance.put(path, data).then(
          response => accept(response.data)
        ).catch(error => reject(error));
      });
  }

  public deleteData(path: string): Promise<any> {
    return new Promise(
      (accept, reject) => {
        this.axiosInstance.delete(path).then(
          response => accept(response.data)
        ).catch(error => reject(error));
      });
  }

  public patchData(path: string, data: unknown): Promise<any> {
    return new Promise(
      (accept, reject) => {
        this.axiosInstance.patch(path, data)
          .then(response => accept(response.data)
          ).catch(error => reject(error));
      });
  }
}

export const ENDPOINTS = {
  USER: {
    SEARCH: '/search/users',
    REPOS: (username: string): string => `users/${username}/repos`,
    STARRED: (username: string): string => `users/${username}/starred`
  }
};
