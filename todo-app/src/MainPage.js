import React, { useState, useEffect } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import Weather from './weather/Weather';
import {useNavigate} from 'react-router-dom';
import Timer from './timer/Timer'

function MainPage() {

  const [lightTheme, setLightTheme] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("UserData") !== null || localStorage.getItem("UserData") !==undefined ){
      navigate("/login");
      }
  });

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

export default MainPage;
