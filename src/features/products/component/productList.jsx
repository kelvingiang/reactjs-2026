import React from 'react';
import ProductItem from './product-item';

ProductList.propTypes = {};


 function ProductList({ dataList, setDataList }) {
  const handleDeleted = (id) => {
    setDataList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="product-data">
      <div className="product-item product-header">
        <div className="item-name">Name</div>
        <div className="item-img">Image</div>
        <div className="item-description">Description</div>
        <div className="item-category">Category</div>
        <div className="item-price">Price</div>
        <div className="item-control">&nbsp;</div>
      </div>
      {dataList.map((item) => (
        <ProductItem key={item.id} item={item}  onDeleted={handleDeleted} />
      ))}
    </div>
  );
}

export default ProductList;
