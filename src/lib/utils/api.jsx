/* eslint-disable no-console */
import axios from 'axios';

const callApi = async (route, method, body) => {
  const BASE_URL = 'http://localhost:9000/api';
  const response = await axios({
    method,
    url: BASE_URL + route,
    data: body,
    proxy: {
      host: 'localhost',
      port: 9000,
    },
  });
  return response;
};

export default callApi;
