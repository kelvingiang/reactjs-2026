import axisoClient from './axiosClient';

const productsApi = {
  getAll(params) {
    const url = '/products';
    return axisoClient.get(url, { params });
  },

  getItem(id) {
    const url = `/products/${id}`;
    return axisoClient.get(url);
  },

  add(data) {
    const url = '/products/add';
    return axisoClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update(id, data) {
    const url = `/products/update/${id}`;
    return axisoClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  remove(id) {
    const url = `/products/${id}`;
    return axisoClient.delete(url);
  },
};

export default productsApi;
