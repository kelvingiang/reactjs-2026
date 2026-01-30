import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 檢查 localStorage 是否有 Token
  const token = localStorage.getItem('jwt_token');

  // 如果沒有 Token，就重導向到登入頁面
  // replace 屬性能防止使用者按瀏覽器的「回上一頁」又回到被攔截的頁面
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 如果有 Token，就正常渲染子組件 (children)
  return children;
};

export default ProtectedRoute;