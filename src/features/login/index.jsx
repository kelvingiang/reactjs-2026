import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginApi from '../../api/loginApi'; // ← 請依你的路徑調整

function LoginFeature(props) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('user', form.user);
      formData.append('password', form.password);
      const res = await loginApi.login(formData);
      // ⭐ 正確位置在 res.data.token
      localStorage.setItem('jwt_token', res.data.token);
       alert('登入成功！');
      console.log('後端回傳：', res.data);

      navigate('/products'); // ← 新增後返回列表
    } catch (err) {
      console.error(err);
      alert('❌ 登入失敗，請檢查 API');
    }
  };
  return (
    <Box
      sx={{
        p: 3,
        width: '50%',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column', // input + 圖片直向排列
        alignItems: 'flex-start', // 左對齊
        justifyItems: 'center',
        gap: 1,
      }}
    >
      <h2>Login </h2>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="賬號:abc"
            name="user"
            fullWidth
            margin="normal"
            value={form.user}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="密碼:123456"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password} // ⭐ 綁 state
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={handleSubmit}>
            登入
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginFeature;
