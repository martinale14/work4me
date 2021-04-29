import {React, Component} from 'react';
import logo from '../assets/w4mLogo.png';
import "../css/index.scss";
import Button from '../components/Button';
import imageBack from '../assets/BackDesignAritos.png'
import worker from '../assets/index.jpg'

export default class Index extends Component{
    render(){
        return(
            <div className="grid">
                <div className="nav-bar">
                    <img src={logo} alt="w4m"/>
                    <Button className="signIn" text="Sign in"/>
                    <Button text="Sign up"/>
                </div>
                <div className="imageBack">
                    <img id="back" src={imageBack} alt="style"/>
                </div>
                <div className="imageBack">
                    <img id="worker" src={worker} alt=""/>
                </div>
            </div>
        );
    }
}