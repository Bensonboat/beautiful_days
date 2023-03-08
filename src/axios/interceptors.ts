import axios, { AxiosError } from "axios";

export interface IAxiosError extends AxiosError {
  data: any;
}

const service = axios.create({
  baseURL: `https://api.stackexchange.com`,
  timeout: 1000 * 10,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default service;
