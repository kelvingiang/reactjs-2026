// import React from 'react';
import React, { useEffect, useState } from 'react';
// tự viết function dưới  export const nên phải gọi trong { }
import { formatMoney } from '../../../utils/format';
import VisibilityIcon from '@mui/icons-material/Visibility'; // View Icon
import DeleteIcon from '@mui/icons-material/Delete'; // Delete Icon
import EditCalendarIcon from '@mui/icons-material/EditCalendar'; // edit icon
import IconButton from '@mui/material/IconButton';
import productsApi from '../../../api/productsApi'; // 路徑依你專案調整
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

ProductItem.propTypes = {};

function ProductItem({ item, onDeleted }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('jwt_token');
      setIsLoggedIn(!!token); // 轉換為布林值
    };
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    const ok = window.confirm(`確定要刪除「${item.name}」嗎？`);
    if (!ok) return;

    try {
      await productsApi.remove(item.id);

      if (onDeleted) {
        onDeleted(item.id); // ⭐ 正確：通知父元件更新列表
      }

      // alert('✔ 已刪除商品！');
    } catch (err) {
      console.error(err);
      alert('❌ 刪除失敗，請檢查 API');
    }
  };

  return (
    <div className="product-item">
      <div className="item-name">{item.name}</div>
      <div className="item-img">
        <img src={item.img} alt={item.name} />
      </div>
      <div className="item-description">{item.description}</div>
      <div className="item-category">{item.category}</div>
      <div className="item-price">{formatMoney(item.price)}</div>
      <div className="item-control">
        {/* <FontAwesomeIcon icon={faEye} style={{ marginRight: 15, color }} /> */}
        {/* <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> */}
        {/* 查看 */}
        {isLoggedIn ? (
          <IconButton color="primary" onClick={() => navigate('/product-edit', { state: item })}>
            <EditCalendarIcon />
          </IconButton>
        ) : (
          <IconButton color="primary" onClick={() => navigate('/product-view', { state: item })}>
            <VisibilityIcon />
          </IconButton>
        )}

        {isLoggedIn && (
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
