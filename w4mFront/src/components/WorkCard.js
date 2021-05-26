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
                        image={this.props.image}
                        roundedColor="#321124"
                        imageWidth="40"
                        imageHeight="40"
                        roundedSize="0"
                        hoverColor="#DD1144"
                        className="picture"
                    />
                    <p className="comp-name">{this.props.nameCompany}</p>
                </div>
                <div className="job">
                    <p className="job2">Vacancy offered</p><p className="salary">{this.props.salary}</p>
                </div>
                <div className="description">
                    <p>{this.props.text}</p>
                </div>
            </div>
        );
    }
}