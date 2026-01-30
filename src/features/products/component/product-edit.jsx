// /features/products/component/productedit.jsx
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ⭐ 記得引入！
import productsApi from '../../../api/productsApi'; // ← 路徑自行調整
import { Girl } from '@mui/icons-material';

export default function ProductEdit() {
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

  // ★★★ 這裡加 API ★★★
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('price', form.price);
      formData.append('description', form.description);

      if (form.image) {
        formData.append('image', form.image); // ⭐ 有選圖才傳
      }

      await productsApi.update(form.id, formData);

      alert('✔ 更新成功！');
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('❌ 更新失敗');
    }
  };

  return (
    <Box sx={{ p: 3, width: '80%', mx: 'auto' }}>
      <h2>📝 商品編輯 Product Edit</h2>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="名稱"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="分類"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="價格"
            name="price"
            value={form.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="描述"
            name="description"
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              setForm((prev) => ({ ...prev, image: file }));
              setPreview(URL.createObjectURL(file));
            }}
          />

          {/* 舊圖 or 新圖預覽 */}
          {preview ? (
            <img src={preview} alt="preview" style={{ width: 150, marginTop: 10 }} />
          ) : (
            form.img && <img src={form.img} alt="old" style={{ width: 150, marginTop: 10 }} />
          )}
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={handleSubmit}>
            💾 儲存修改
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
