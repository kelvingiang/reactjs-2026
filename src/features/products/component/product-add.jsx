import { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import productsApi from '../../../api/productsApi'; // ← 請依你的路徑調整

export default function ProductAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null, // ⭐ 圖片檔
  });

  const [preview, setPreview] = useState(null); // ⭐ 一定要有
  // ⭐ 就放在這裡（state 下面、return 上面）
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('price', form.price);
      formData.append('description', form.description);

      if (form.image) {
        formData.append('image', form.image); // ⭐ key 一定叫 image
      }
      const res = await productsApi.add(formData);
      alert('🎉 商品新增成功！');
      console.log('後端回傳：', res.data);

      navigate('/products'); // ← 新增後返回列表
    } catch (err) {
      console.error(err);
      alert('❌ 新增失敗，請檢查 API');
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        width: '80%',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column', // input + 圖片直向排列
        alignItems: 'flex-start', // 左對齊
        justifyItems: 'center',

        gap: 1,
      }}
    >
      <h2>➕ 新增商品 Product Add</h2>

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
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            p: 6,
            // backgroundColor: '#882e2eff',
            display: 'flex',
             flexDirection: 'row',
            justifyContent: 'left',
            alignItems: 'center',
          }}
        >
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

          {/* 圖片預覽（一定要在 input 外面） */}
          {preview && <img src={preview} alt="preview" style={{ width: 150, marginTop: 10 }} />}
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={handleSubmit}>
            🚀 送出新增
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
