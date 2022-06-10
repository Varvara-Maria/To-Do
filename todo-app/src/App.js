import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import { LoginPage } from './LoginPage/LoginPage';
import { useNavigate } from 'react-router';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="/"
            exact element={
              <MainPage />
            }
            />
        <Route 
          path="/login"
          exact element={
            <LoginPage />
          }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
