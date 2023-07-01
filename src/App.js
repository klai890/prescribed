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
import DrLogin from './pages/dr/login'
import SelectPatient from './pages/dr/SelectPatient'
import Chat from './pages/chat';
import Profile from './pages/profile'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/prescriptions" element={<Prescriptions/>} />
          <Route exact path="/doctors" element={<Doctors/>} />
          <Route exact path="/chat" element={<Chat/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/dr/login" element={<DrLogin />} />
          <Route exact path="/dr/selectpatient" element={<SelectPatient />} />
        </Routes>
    </Router>
  );
}

export default App;