import axisoClient from './axiosClient';

const productShowApi = {
  getPaging(params) {
    const url = '/products/paging';
    console.log(url);
    console.log(params);
    return axisoClient.get(url, { params });
  },
};

export default productShowApi;
