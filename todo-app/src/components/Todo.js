import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';


function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        task: '',
    });

    useEffect(()=>{
        console.log(todos)
    },[])

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            task: ''
        });
    };


    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    
  return todos?.map((todo, index) => (
        <div 
            className={todo.isDone ? 'todo-row complete' : 'todo-row'} 
            key={todo._id}
        >
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.task}
            </div>
            <div className='icons'>
                <RiCloseCircleLine 
                    onClick={() => removeTodo(todo.id)}
                    className='delete-icon'
                />
                <TiEdit 
                    onClick={() => setEdit({ id: todo.id, value: todo.task})}
                    className='edit-icon'
                />
            </div>
        </div>
  ))
}

export default Todo;