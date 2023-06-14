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
import Doctors from './pages/doctors';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/prescriptions" element={<Prescriptions/>} />
          <Route exact path="/doctors" element={<Doctors/>} />
        </Routes>
    </Router>
  );
}

export default App;