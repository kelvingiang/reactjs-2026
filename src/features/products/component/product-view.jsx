// /features/products/component/productedit.jsx
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ⭐ 記得引入！
import productsApi from '../../../api/productsApi'; // ← 路徑自行調整
// import { Girl } from '@mui/icons-material';

export default function ProductView() {
  const { state } = useLocation(); // ← 接收到 navigate 傳來的 item
  const navigate = useNavigate();

  // ★ 將資料塞進 form，本頁所有輸入欄位都會被自動綁定
  const [form, setForm] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    description: '',
    image: null, // ⭐ 新增
    img: '', // ⭐ 舊圖 URL
  });

  const [preview, setPreview] = useState(null);

  // ★ 進入頁面時自動帶入傳進來的 state
  useEffect(() => {
    if (state) setForm(state);
  }, [state]);

  // ★ 釋放圖片預覽記憶體
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ★ input 改變 → form 自動更新
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        p: 3,
        width: '80%',
        mx: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" gutterBottom>
        商品資訊
      </Typography>

      <Grid container spacing={3}>
        {/* 基本資訊 */}
        <Grid item xs={6} sm={3}>
          <Typography variant="caption" color="textSecondary" display="block">
            Name
          </Typography>
          <Typography variant="body1">{form.name}</Typography>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Typography variant="caption" color="textSecondary" display="block">
            Category
          </Typography>
          <Typography variant="body1">{form.category}</Typography>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Typography variant="caption" color="textSecondary" display="block">
            Price
          </Typography>
          <Typography variant="body1" color="primary.main" fontWeight="bold">
            ${form.price}
          </Typography>
        </Grid>

        {/* 描述通常文字較多，給予更多空間 */}
        <Grid item xs={6} sm={3} >
          <Typography variant="caption" color="textSecondary" display="block">
            Description
          </Typography>
          <Typography variant="body2">{form.description}</Typography>
        </Grid>

        {/* 圖片建議設定 max-width 與響應式 */}
        <Grid item xs={12}>
          <Box
            component="img"
            src={form.img}
            alt="Product"
            sx={{
              width: '100%',
              maxWidth: 400, // 限制最大寬度
              height: 'auto',
              borderRadius: 1,
              border: '1px solid #eee',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
