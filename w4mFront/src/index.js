import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/Login'
import Index from './views/Index'
import Register from './views/Register'
import { BrowserRouter as Router, Route} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
