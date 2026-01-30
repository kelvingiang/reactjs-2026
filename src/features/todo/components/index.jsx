import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

TodoList.propTypes = {
  todoList: PropTypes.array,
};

TodoList.defaultProps = {
  todoList: [],
};

function TodoList({ todoList }) {
  const Count = useSelector((state) => state.Count);
  return (
    <div>
      <div>
        <h2>Redux Counter : {Count} </h2>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <div>{todo.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
