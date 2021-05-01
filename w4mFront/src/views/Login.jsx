import { React, Component } from 'react';
import logo from '../assets/w4mLogo.png';
import name from '../assets/w4mLogoWords.png';
import "../css/login.scss";
import Input from '../components/Input';
import Btn from '../components/Btn';
import RaisedButton from '../components/RaisedButton';

export default class Login extends Component {
  render() {
    return (
      <div className="maincito">
        <div className="container">
          <img
            className="logo"
            src={logo}
            alt="Work4Me" />
          <img
            className="logoWord"
            src={name}
            alt="Work4Me" />
        </div>
        <br />
        <br />
        <h2 className='title'>
          Sign in
        </h2>
        <br />
        <Input id="Email" type="text" placeholder="Email address" className="inp"/>
        <Input id="Password" type="password" placeholder="Password" className="inp"/>
        <br />
        <br />
        <Btn text="Sign in" onClick={() => {
          console.log('Button was clicked.');
        }} />
        <br />
        <div className="link">
          Don't you have an account? &nbsp;
          <RaisedButton text="Click here" onClick={() => {
            console.log('The link was clicked.');
          }} />
        </div>
      </div>
    );
  }
}