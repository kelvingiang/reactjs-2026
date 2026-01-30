import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DotoForm from '../../components/todoform';
import TodoList from '../../components/todolist';

TodoData.propTypes = {};

function TodoData(props) {
  const intitodolist = [
    {
      id: 1,
      title: 'eat',
    },
    {
      id: 2,
      title: 'sleep',
    },
    {
      id: 3,
      title: 'code',
    },
    {
      id: 4,
      title: 'play',
    },
  ];

  const [todolist, setTodolist] = useState(intitodolist);

  const handleFromSubmit = (value) => {
    console.log('Form Submit sss :', value);
    const newTodo = {
      id: todolist.length + 1,
      title: value.title,
    };

    const newTodoList = [...todolist, newTodo];
    setTodolist(newTodoList);
  };

  const count = useSelector((state) => state.count);

  return (
    <div>
      <div>
        <h1>Redux Conut : {count}</h1>
      </div>

      <div>
        <h2> this is DotoForm</h2>
        <DotoForm onSubmit={handleFromSubmit} />
      </div>

      <div>
        <h1>todo Data</h1>
      </div>
      <TodoList todoList={todolist} />
    </div>
  );
}

export default TodoData;
