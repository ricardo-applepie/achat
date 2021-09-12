import React, { useState }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { io } from "socket.io-client";
import Login from './pages/login/Login';
import HomePage from './pages/homepage/Homepage';
import Navbar from './components/navbar/Navbar';
import SignUp from './pages/signUp/SignUp';
function App() {

  return (
    <div className='page-width'>
    
       <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route component={SignUp}/>
        </Switch>
       </Router>
     
      
    </div>
  );
}

export default App;
