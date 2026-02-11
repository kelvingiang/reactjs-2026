import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost/api-app/wp-json/api/v1/',
  headers: { 'Content-Type': 'application/json' },
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
  // (response) => response.data,
  (error) => {
    // 檢查是否是網路斷線 (ERR_CONNECTION_REFUSED)
    const isNetworkError = !error.response && error.request;
    // 請求失敗（例如 404, 500, 或網路斷線）時會進到這裡
    let message = '連線失敗，請稍後再試';

    // if (error.response?.status === 401) {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('jwt_token');
        window.location.href = '/login';
      }
      message = `伺服器錯誤 (${error.response.status})`;
      return Promise.reject(error);
    } else if (error.request) {
      // 請求已發出但沒收到回應 (如網路斷線)
      message = '網路連線異常，請檢查您的網路!!!';
    }
    // 在這裡觸發提示 (以瀏覽器原生 alert 為例)
    alert(message);

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
