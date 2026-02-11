import React, { useEffect, useState, useCallback, useRef } from 'react';
import productShowApi from '../../api/productShowApi';
import ProductList from './component/productList';
import { useNavigate } from 'react-router-dom';

function ProductsShow(props) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // 👈 新增頁碼管理
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null); // 👈 1. 新增錯誤狀態

  const navigate = useNavigate();

  // 檢查登錄狀態
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    setIsLoggedIn(!!token);
  }, []);

  // 在組件內定義一個 ref 作為請求鎖
  const isFetching = useRef(false);

  const fetchProducts = useCallback(async () => {
    // 1. 如果正在加載、沒有更多數據、或正在請求中，直接跳出
    if (loading || !hasMore || isFetching.current) return;

    isFetching.current = true; // 加鎖
    setLoading(true);
    setError(null); // 👈 2. 每次請求前先清除之前的錯誤

    try {
      const currentOffset = dataList.length;
      const currentLimit = currentOffset === 0 ? 4 : 2;

      const response = await productShowApi.getPaging({
        _offset: currentOffset,
        _limit: currentLimit,
      });

      // 2. 關鍵修正：精確提取陣列
      // 假設後端回傳格式是 { data: [...] } 或直接是 [...]
      const rawData = response.data?.data || response.data;

      if (!Array.isArray(rawData)) {
        console.error('錯誤：API 回傳的不是陣列！', rawData);
        setHasMore(false);
        return;
      }

      if (rawData.length === 0) {
        setHasMore(false);
      } else {
        setDataList((prev) => {
          // 額外檢查：防止重複添加相同 ID 的產品（解決 offset 跳號導致的數據重疊）
          const newItems = rawData.filter(
            (item) => !prev.some((prevItem) => prevItem.id === item.id)
          );
          return [...prev, ...newItems];
        });

        if (rawData.length < currentLimit) {
          setHasMore(false);
        }
      }
    } catch (err) {
      // console.error('Fetch error:', err);
      console.warn("API 請求失敗，已攔截並顯示自定義提示");
      setError('連線失敗，請稍後再試'); // 👈 3. 設定錯誤訊息內容
    } finally {
      setLoading(false);
      isFetching.current = false; // 解鎖
    }
  }, [dataList.length, loading, hasMore]);

  // 初始載入
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 僅在組件掛載時執行一次初始請求

  return (
    <div className="product-content">
      {/* 👈 4. 在 UI 上顯示錯誤提示 */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <ProductList
        dataList={dataList}
        loading={loading}
        hasMore={hasMore}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default ProductsShow;
