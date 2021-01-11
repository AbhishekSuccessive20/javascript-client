/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';
import ls from 'local-storage';

const callApi = async (url, method, data) => {
  try {
    const baseUrl = `http://localhost:9000/api/${url}`;
    console.log('data : ', data);
    console.log('baseUrl : ', baseUrl);
    const response = await axios({
      method,
      url: baseUrl,
      data,
      headers: {
        authorization: ls.get('token'),
      },
    });
    return response.data;
  } catch (error) {
    console.log('Inside catch', error);
    return { status: 'error', message: 'This is a error message' };
  }
};

export default callApi;
