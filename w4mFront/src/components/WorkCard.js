import { React, Component } from 'react';
import "../css/workCard.scss";
import imagen from '../assets/index.jpg'
import ReactRoundedImage from "react-rounded-image";
import RaisedButton from './RaisedButton';

export default class WorkCard extends Component {
    render() {
        return (
            <div className="home-card">
                <div className="picture">
                    <ReactRoundedImage
                        image={imagen}
                        roundedColor="#321124"
                        imageWidth="40"
                        imageHeight="40"
                        roundedSize="0"
                        hoverColor="#DD1144"
                        className="picture"
                    />
                    <p className="comp-name">Company's name</p>
                </div>
                <div className="job">
                    <p className="job2">Vacancy offered</p><p className="salary">$1'200.000</p>
                </div>
                <div className="description">
                    <p>Public accountant is required, with verificable experience, with management of the word office program,  
                        high level of commitment and attitude, skills in relation with internal and external personnel and team 
                        work... <RaisedButton className="see" text="See more"/></p>
                </div>
            </div>
        );
    }
}