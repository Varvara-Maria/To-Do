import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function ToDoList({Theme}) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if(todos.length) localStorage.setItem('item', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const localStorageTodos = JSON.parse(localStorage.getItem('item'));
        if (!todos.length && localStorageTodos) {
            setTodos(localStorageTodos)
        }
    }, []);

    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos(prev => prev.map(item => (item.id === todoId  ? newValue : item)))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr);
    };

    const filterTasks = (todoFilter) => {
        const activeTasks = todoFilter.filter(item => !item.isComplete);
        const completedeTasks = todoFilter.filter(item => item.isComplete);
        return [...activeTasks, ...completedeTasks]

    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(filterTasks(updatedTodos));
    };

  return (
    <div>
        <h1>What's the Plan for Today?</h1>
        <TodoForm Theme={Theme} onSubmit={addTodo} />
        <Todo 
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
        />
    </div>
  )
}

export default ToDoList