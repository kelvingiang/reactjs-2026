import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/notfound';
import TodoData from './pages/data';
import TodoDetail from './pages/detail';

function TodoFeature() {
  return (
    <div>
      <h2>TODO page haaaaaa</h2>

      <Routes>
        {/* /todo */}
        <Route index element={<TodoData />} />

        {/* /todo/:todoid */}
        <Route path=":todoid" element={<TodoDetail />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default TodoFeature;

