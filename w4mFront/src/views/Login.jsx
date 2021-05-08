import { React, Component } from 'react';
import logo from '../assets/w4mLogo.png';
import name from '../assets/w4mLogoWords.png';
import back from '../assets/BackDesignLogin.png'
import "../css/login.scss";
import Input from '../components/Input';
import Btn from '../components/Btn';
import RaisedButton from '../components/RaisedButton';
import url from '../assets/url.json';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div className="body">
        <div id="imgCont">
          <img src={back} alt="" />
        </div>
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
          <Input id="Email" type="text" placeholder="Email address" className="inp" onChange={(data) => { this.setState({ email: data.target.value }); }} value={this.state.email} />
          <Input id="Password" type="password" placeholder="Password" className="inp" onChange={(data) => { this.setState({ password: data.target.value }); }} value={this.state.password} />
          <br />
          <br />
          <Btn text="Sign in" onClick={this.login} />
          <br />
          <div className="link">
            Don't you have an account? &nbsp;
            <RaisedButton text="Click here" onClick={() => {
              console.log('The link was clicked.');
            }} />
          </div>
        </div>
      </div>
    );
  }

  login() {

    if (this.state.email !== '' && this.state.password !== '') {

      fetch(`${url.link}/login`, {
        method: 'POST',
        body: JSON.stringify({ email: this.state.email, password: this.state.password }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(data => {
          console.log(data.msg);
          this.setState({ email: '', password: '' });
          if (data.msg === 'Conectado') {

            this.props.history.push('/');

          }
        })
        .catch(err => console.error(err));

    }

  }

}