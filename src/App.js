import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import MenuComponent from './components/menu';
import AlbumFeature from './features/album';
import CounterFeature from './features/counter';
import MemberFeature from './features/member';
import ProductsFeature from './features/products';
import TodoFeature from './features/todo';
import StaffFeature from './features/staff';
import LoginFeature from './features/login';
import LogoutFeature from './features/login/logout';
import ProductEdit from './features/products/component/product-edit';
import ProductAdd from './features/products/component/product-add';
import ProductView from './features/products/component/product-view';
// tao file kiem tra đăng nhập thành công mới được vô trang này
import ProtectedRoute from './components/ProtectedRoute';




function App() {
  return (
    <div className="App">
      <Header />
      <MenuComponent />

      <Routes>
        <Route path="/" element={<CounterFeature />} />
        <Route path="/todo" element={<TodoFeature />} />
        <Route path="/album" element={<AlbumFeature />} />
        <Route path="/member" element={<MemberFeature />} />
        <Route path="/products" element={<ProductsFeature />} />
        <Route path="/staff" element={<StaffFeature />} />
        <Route path="/login" element={<LoginFeature />} />
        <Route path="/logout" element={<LogoutFeature />} />
        <Route path="/product-view" element={<ProductView />} />
        
        {/* <Route path="/product-edit" element={<ProductEdit />} /> 
        <Route path="/product-add" element={<ProductAdd />} />  */}

        {/* 受保護的路由：只有登入後才能進入 */}
        <Route 
          path="/product-edit" 
          element={
            <ProtectedRoute>
              <ProductEdit />
            </ProtectedRoute>
          } 
        /> 
        
        <Route 
          path="/product-add" 
          element={
            <ProtectedRoute>
              <ProductAdd />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
