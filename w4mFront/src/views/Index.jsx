import { React, Component } from 'react';
import logo from '../assets/w4mLogo.png';
import "../css/index.scss";
import Btn from '../components/Btn';
import imageBack from '../assets/BackDesignAritos.png'
import worker from '../assets/index.jpg'

export default class Index extends Component {

    render() {

        return (
            <div className="grid">
                <div className="nav-bar">
                    <img src={logo} alt="w4m" />
                    <Btn id="signin" onClick={() => { this.props.history.push('/login') }} className="signIn" text="Sign in" />
                    <Btn text="Sign up" onClick={() => { this.props.history.push('/register') }} />
                </div>
                <div className="imageBack">
                    <img id="back" src={imageBack} alt="style" />
                    <div>
                        <h1>Welcome</h1>
                        <h2>Your future <br /> is waiting for you</h2>
                        <br />
                        <br />
                        <br />
                        <Btn text="GET STARTED" onClick={() => {
                            this.props.history.push('/register')
                        }} />
                    </div>
                </div>
                <div className="imageBack">
                    <img id="worker" src={worker} alt="" />
                </div>
            </div>
        );
    }
}