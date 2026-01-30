import React, { useEffect, useState } from 'react';
import productsApi from '../../api/productsApi';
import ProductList from './component/productList';
import { useNavigate } from 'react-router-dom';

ProductsFeature.propTypes = {};
// ... 在組件內部

function ProductsFeature(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('jwt_token');
      setIsLoggedIn(!!token); // 轉換為布林值

      const params = { _limit: 10 };
      const res = await productsApi.getAll(params);
      setDataList(res.data.data || []); // ← 取出陣列才行！
    };
    fetchProducts();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="product-space">
      <div className="product-btn">
        {isLoggedIn && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/product-add')}
          >
            Add New
          </button>
        )}
      </div>
      <div className="product-content">
        <ProductList dataList={dataList} setDataList={setDataList} />
      </div>
    </div>
  );
}

export default ProductsFeature;
