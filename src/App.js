import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from './pages/login';
import Prescriptions from './pages/prescriptions';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/prescriptions" element={<Prescriptions/>} />
        </Routes>
    </Router>
  );
}

export default App;