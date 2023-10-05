// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Auth SpecificComponent={LandingPage} option={null} />} // 함수 호출 대신 컴포넌트 전달
          />
          <Route
            path="/login"
            element={<Auth SpecificComponent={LoginPage} option={false} />} // 함수 호출 대신 컴포넌트 전달
          />
          <Route
            path="/register"
            element={<Auth SpecificComponent={RegisterPage} option={false} />} // 함수 호출 대신 컴포넌트 전달
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
