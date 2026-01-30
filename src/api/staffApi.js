import axisoClient from './axiosClient';

const productsApi = {
  getAll(params) {
    const url = '/members';
    return axisoClient.get(url, { params });
  },

  getItem(id) {
    const url = `/members/${id}`;
    return axisoClient.get(url);
  },

  add(data) {
    const url = '/members';
    return axisoClient.post(url, data);
  },

  update(data) {
    const url = `/members/${data.id}`;
    return axisoClient.patch(url, data);
  },

  remove(id) {
    const url = `/members/${id}`;
    return axisoClient.delete(url);
  },
};

export default productsApi;
