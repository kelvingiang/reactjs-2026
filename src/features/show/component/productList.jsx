import React, { useRef, useCallback, useEffect } from 'react';

// --- 單個產品項目的組件 (處理進場動畫) ---
const ProductCard = ({ product, isLastItem, lastProductRef }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 當項目進入視窗時加上 class，然後停止觀察
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // 只要露出 10% 就觸發動畫
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 合併原本的 Ref 邏輯：既要給動畫用，最後一筆也要給分頁偵測用
  const setRefs = (node) => {
    itemRef.current = node;
    if (isLastItem) lastProductRef(node);
  };

  return (
    <div ref={setRefs} className="product-item">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="category">{product.category}</p>
      <span className="price">${product.price}</span>
    </div>
  );
};

// --- 主組件 (處理分頁邏輯) ---
function ProductList({ dataList, loading, hasMore, fetchProducts }) {
  const observer = useRef();

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          // 設定 rootMargin 為 30px 以符合你之前的需求
          if (entries[0].isIntersecting && hasMore) {
            fetchProducts();
          }
        },
        { rootMargin: '0px 0px 30px 0px' }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchProducts]
  );

  return (
    <div>
      <div className="product-show">
        {dataList.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
            isLastItem={dataList.length === index + 1}
            lastProductRef={lastProductRef}
          />
        ))}
      </div>
      {loading && <div className="loading">⏳ 載入中...</div>}
      {!hasMore && <div className="no-more">沒有更多數據了</div>}
    </div>
  );
}

export default ProductList;
