// import React from 'react';
import React, { useEffect, useState } from 'react';
// tự viết function dưới  export const nên phải gọi trong { }
import { formatMoney } from '../../../utils/format';


import { useNavigate } from 'react-router-dom';

ProductItem.propTypes = {};

function ProductItem({ item, onDeleted }) {
  return (
    <div className="product-item">
      <div className="item-name">{item.name}</div>
      <div className="item-img"><img src={item.img} alt={item.name} /></div>
      <div className="item-description">{item.description}</div>
      <div className="item-category">{item.category}</div>
      <div className="item-price">{formatMoney(item.price)}</div>
    </div>
  );
}

export default ProductItem;
