import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');


    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    });

    const handleChange = e => {
      setInput(e.target.value);
    };

    const handleSubmit = e => {
      e.preventDefault();
      localStorage.setItem('input', input);
      props.onSubmit({
        task: input
      });

      setInput('');
    };

    useEffect(()=>{
      console.log(props);
    },[])


  return (
    props.Theme? 
    <form  className='todo-form' onSubmit={handleSubmit}>
      {props.edit ? (
        <>
        <input 
          type='text' 
          placeholder='Update your item' 
          value={input} 
          name='text' 
          className="todo-input edit"
          onChange={handleChange} 
          ref={inputRef}
        />
        <button className="todo-button edit">Update</button>
        </>
      ) : (
        <>
        <input 
            type='text' 
            placeholder='Add a toDo' 
            value={input} 
            name='text' 
            className="todo-input"
            onChange={handleChange} 
            ref={inputRef}
        />
        <button className="todo-button">Add toDo</button>
        </>
      )}

        
    </form>
  :
  <form  className='todo-form' onSubmit={handleSubmit}>
      {props.edit ? (
        <>
        <input 
          type='text' 
          placeholder='Update your item' 
          value={input} 
          name='text' 
          className="todo-input edit"
          onChange={handleChange} 
          ref={inputRef}
        />
        <button className="todo-button edit">Update</button>
        </>
      ) : (
        <>
        <input 
            type='text' 
            placeholder='Add a toDo' 
            value={input} 
            name='text' 
            className="todo-input"
            onChange={handleChange} 
            ref={inputRef}
        />
        <button className="todo-button">Add toDo</button>
        </>
      )}

        
    </form>
  );
};

export default TodoForm;