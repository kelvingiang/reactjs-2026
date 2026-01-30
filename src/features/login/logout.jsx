import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LogoutFeature() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 執行登出邏輯
    const performLogout = () => {
      // 清除本地存儲的驗證資訊
    //   localStorage.removeItem('token');
       localStorage.removeItem('jwt_token');
      // 如果你有儲存使用者資訊也可以一併清除
    //   localStorage.removeItem('user');
      sessionStorage.clear();

      // 2. 執行跳轉
      // 使用 setTimeout 是為了給使用者一點視覺回饋，若不需要可直接 navigate
      setTimeout(() => {
        // 跳轉到產品頁面
        // replace: true 確保使用者點擊瀏覽器「回上一頁」時，不會再回到這個登出頁面
        navigate('/products', { replace: true });
      }, 500);
    };

    performLogout();
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh', // 讓內容水平垂直居中
      }}
    >
      <CircularProgress color="primary" sx={{ mb: 2 }} />
      <Typography variant="h6" color="textSecondary">
        正在登出並導向產品頁面...
      </Typography>
    </Box>
  );
}

export default LogoutFeature;
