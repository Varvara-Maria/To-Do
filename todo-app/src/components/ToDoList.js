import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import axios from 'axios';
import {ClipLoader} from 'react-spinners'


function ToDoList({Theme}) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        const Todos = JSON.parse(localStorage.getItem('UserData')).ToDoList;
        Todos.sort((a, b) => a.isDone - b.isDone);
        console.log(Todos);
        setTodos(Todos)
    }, []);

    const addTodo = todo => {
        setLoading(true);
        axios.post(`http://localhost:4000/api/addNewTask/${JSON.parse(localStorage.getItem('UserData'))._id}`,{
            task : todo.task
        }).then((res)=>{
            setTodos(res.data.ToDoList);
            localStorage.setItem("UserData",JSON.stringify(res.data));
            setLoading(false);
        })
        
    };


    const updateTodo = (todoId, newValue) => {
        console.log(todoId);
        console.log(newValue);
        axios.post(`http://localhost:4000/api/updateTask/${JSON.parse(localStorage.getItem('UserData'))._id}/${todoId}`,{
            task : newValue.task
        }).then( res =>{
            console.log(res);
            // setTodos(res.data.ToDoList);
            localStorage.setItem("UserData",JSON.stringify(res.data));
        })
        setTodos(prev => prev.map(item => (item.id === todoId  ? newValue : item)))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        axios.get(`http://localhost:4000/api/deleteTask/${JSON.parse(localStorage.getItem('UserData'))._id}/${id}`).then((res)=>{
            console.log(res);
            localStorage.setItem('UserData', JSON.stringify(res.data));
            setTodos(removeArr);
        })
        
    };

    const filterTasks = (todoFilter) => {
        const activeTasks = todoFilter.filter(item => !item.isDone);
        const completedeTasks = todoFilter.filter(item => item.isDone);
        console.log(activeTasks);
        console.log(completedeTasks);
        return [...activeTasks, ...completedeTasks]

    }

    const completeTodo = id => {
        axios.get(`http://localhost:4000/api/markIsDone/${JSON.parse(localStorage.getItem('UserData'))._id}/${id}`).then((res)=>{
            console.log(res);
            localStorage.setItem('UserData', JSON.stringify(res.data))
        }).catch((err)=>{
            alert(err)
        })
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone;
            }
            return todo;
        });
        setTodos(filterTasks(updatedTodos));
    };

  return (
    <div>
        <h1>What's the Plan for Today?</h1>
        
        {loading ? <ClipLoader color = {"white"} size = {150} style = {{margin : "auto"}}/> : 
            <>
            <TodoForm Theme={Theme} onSubmit={addTodo} />
            <Todo 
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
        />
        </>
        }
        
    </div>
  )
}

export default ToDoList