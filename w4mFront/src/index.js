import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/Login'
import Home from './views/Home'
import Index from './views/Index'
import Register from './views/Register'
import HomeCompany from './views/HomeCompany'
import Applications from './views/Applications'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Prueba from './views/prueba';
import React from 'react';
import PdfView from './components/PdfView'

ReactDOM.render(

  <Router>
    <Route exact path="/" component={Index} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/prueba/:id" component={Prueba} />
    <Route exact path="/Home/candidate/:id" component={Home} />
    <Route exact path="/Home/company/:id" component={HomeCompany} />
    <Route exact path="/Home/company/applications/:idVacant/:id" component={Applications} />
  </Router>,


  document.getElementById('root')
);
