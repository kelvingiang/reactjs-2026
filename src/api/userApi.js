import axisoClient from './axiosClient';

const userApi = {
  getAll(params) {
    const url = '/user';
    return axisoClient.get(url, { params });
  },

  getItem(id) {
    const url = `/user/${id}`;
    return axisoClient.get(url);
  },

  add(data) {
    const url = '/user';
    return axisoClient.post(url, data);
  },

  update(data) {
    const url = `/user/${data.id}`;
    return axisoClient.patch(url, data);
  },

  remove(id) {
    const url = `/user/${id}`;
    return axisoClient.delete(url);
  },
};

export default userApi;
