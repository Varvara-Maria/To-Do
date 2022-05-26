import React, { useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import Weather from './weather/Weather';
import Timer from './timer/Timer'

function App() {

  const [lightTheme, setLightTheme] = useState(false);

  const changeTheme = () => {
    switch(lightTheme) {
      case true : {
        setLightTheme(false);
        break;
      } 
      case false : {
        setLightTheme(true)
        break;
      };
    }
  }

  return (
      <div className="app" style={lightTheme?{backgroundColor: 'white'} : {}}>
        <Weather />
        <div className="todo-app" style={lightTheme?{backgroundColor: 'grey'} : {}}>
          <ToDoList Theme={lightTheme}/>
        </div>
        <div className="todo-timer">
          <input onClick={changeTheme} type="checkbox" id="toggle" />
          <label for="toggle" class="button"></label>
          <Timer />
        </div>
      </div>
  );
}

export default App;
