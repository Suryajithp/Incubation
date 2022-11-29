
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard'
import Booking from './pages/Booking'
import Analytics from './pages/analytics'
import Notfound from './pages/notfound'
import Decliend from './pages/Decliend'
import Approve from './pages/Approve'
import Home from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import Status from './pages/status';
import Adminlogin from './components/adminlogin/adminlogin';



function App() {
  return (
    <div>
      <Router>

        <Routes>

          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/status" element={<Status />} />
          <Route path="/admin" element={<Adminlogin />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/decliend" element={<Decliend />} />
          <Route path="/approve" element={<Approve />} />
          <Route path="*" exact element={<Notfound />} />
        </Routes>
        
      </Router>

    </div>
  )
}

export default App
