import axios from 'axios';

const callApi = async (route, method, body, header, params) => {
  const BASE_URL = 'http://localhost:9000/api';
  const response = await axios({
    method,
    baseURL: BASE_URL,
    url: route,
    data: body,
    headers: {
      authorization: header,
    },
    params,
  });
  return response;
};

export default callApi;
