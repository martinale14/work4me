import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/Login'
import Index from './views/Index'
import Register from './views/Register'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Prueba from './views/prueba';
import React from 'react';

ReactDOM.render(

  <Router>
    <Route exact path="/" component={Index} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/prueba/:id" component={Prueba} />
  </Router>,


  document.getElementById('root')
);
