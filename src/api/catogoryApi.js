import axisoClient from './axiosClient';

const categoryApi = {
  getAll(params) {
    const url = '/categories';
    return axisoClient.get(url, { params });
  },

  getItem(id) {
    const url = `/categories/${id}`;
    return axisoClient.get(url);
  },

  add(data) {
    const url = '/categories';
    return axisoClient.post(url, data);
  },

  update(data) {
    const url = `/categories/${data.id}`;
    return axisoClient.patch(url, data);
  },

  remove(id) {
    const url = `/categories/${id}`;
    return axisoClient.delete(url);
  },
};

export default categoryApi;
