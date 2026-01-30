import axisoClient from './axiosClient';

const loginApi = {

  login(data) {
    const url = '/login';
    return axisoClient.post(url, data);
  },


};
export default loginApi;
