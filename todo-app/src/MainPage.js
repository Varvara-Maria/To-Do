import React, { useState, useEffect } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import Weather from './weather/Weather';
import {useNavigate} from 'react-router-dom';
import Timer from './timer/Timer'
import axios from 'axios';

function MainPage() {

  const [lightTheme, setLightTheme] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("UserData") === null || localStorage.getItem("UserData") === undefined ){
      console.log("work")
      navigate("/login");
    }
    else{
      console.log(JSON.parse(localStorage.getItem('UserData'))._id)
      axios.get(`http://localhost:4000/api/getUserData/${JSON.parse(localStorage.getItem('UserData'))._id}`).then((res)=>{
        localStorage.setItem('UserData', JSON.stringify(res.data))
        console.log(res)
      }).catch((err)=>{
        console.log("catch")
        localStorage.removeItem('UserData');
        navigate("/login");
      })
    }
  },[]);

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
        <div className="todo-app" style={lightTheme?{backgroundColor: 'rgb(107, 105, 105)'} : {}}>
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
