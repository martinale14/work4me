import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/Login'
import Index from './views/Index'
import { BrowserRouter as Router, Route} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
