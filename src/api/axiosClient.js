import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost/api-app/wp-json/api/v1/',
  // ❌ 不要在這裡固定 Content-Type
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  console.log('JWT in interceptor =', token); // ⭐ debug
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// response 不要亂改結構（保留 axios 原樣）
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

// import axios from 'axios';

// const axisoClient = axios.create({
//   baseURL: 'http://localhost/api-app/wp-json/api/v1/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axisoClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('jwt_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add a response interceptor
// axisoClient.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response.data;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

// export default axisoClient;
