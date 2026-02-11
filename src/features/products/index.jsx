import React, { useEffect, useState, useRef } from 'react';
import productsApi from '../../api/productsApi';
import ProductList from './component/productList';
import { useNavigate } from 'react-router-dom';

ProductsFeature.propTypes = {};
// ... 在組件內部

function ProductsFeature(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null); //………
  const [loading, setLoading] = useState(false); // 👈 加入這一行
  const isFetching = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching.current) return;
    // 3. 【關鍵】發出請求前立刻上鎖 (同步操作)
    isFetching.current = true;

    const fetchProducts = async () => {
      const token = localStorage.getItem('jwt_token');
      setIsLoggedIn(!!token); // 轉換為布林值
      setError(null); // 👈 2. 每次請求前先清除之前的錯誤
      setLoading(true); // 👈 開始載入
      try {
        // 2. 執行 API 請求
        const res = await productsApi.getAll();
        // 3. 成功後更新資料
        // setDataList(res.data.data || []);
        if (res.data && Array.isArray(res.data.data)) {
          setDataList(res.data.data);
        } else {
          // 預防萬一，如果結構不如預期
          setDataList(res.data || []);
        }
      } catch (error) {
        // 4. 👈 這裡就是攔截點！當網路斷線或伺服器 500 時會跑這裡
        console.error('抓取產品資料失敗:', error);
        setError('連線失敗，請稍後再試'); // 👈 3. 設定錯誤訊息內容
        setDataList([]);
      } finally {
        // 5. 請求徹底結束才解鎖
        setLoading(false); // 👈 結束載入
        isFetching.current = false;
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-space">
      {loading ? (
        <div className='loading'>載入中...</div>
      ) : error ? (
        <div className="error-message">
          {error}
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
}

export default ProductsFeature;
