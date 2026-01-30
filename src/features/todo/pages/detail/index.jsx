import React from 'react';
import TodoList from '../../components/todolist';

TodoDetail.propTypes = {};

function TodoDetail(props) {
  const todolist = [
    {
      id: 1,
      title: 'one',
    },
    {
      id: 2,
      title: 'two',
    },
    {
      id: 3,
      title: 'three',
    },
    {
      id: 4,
      title: 'four',
    },
  ];

  return (
    <div>
      <div>
        <h1>todo Detail</h1>
      </div>
      <TodoList todoList={todolist} />
    </div>
  );
}

export default TodoDetail;
