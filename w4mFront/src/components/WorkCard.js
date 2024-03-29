import { React, Component } from 'react';
import '../css/workCard.scss';
import ReactRoundedImage from 'react-rounded-image';
import RaisedButton from './RaisedButton'

export default class WorkCard extends Component {
    render() {
        return (
            <div className="home-card">
                <div className="picture">
                    <ReactRoundedImage
                        image={this.props.image}
                        roundedColor="#000000"
                        imageWidth="40"
                        imageHeight="40"
                        roundedSize="0"
                        hoverColor="#000000"
                        className="picture"
                    />
                    <RaisedButton text={this.props.nameCompany} className="comp-name" onClick={this.props.onClickProfile} />
                </div>
                <div className="job">
                    <p className="job2">{`${this.props.vacant} / $${this.props.salary} / ${this.props.city}`}</p>
                </div>
                <div className="description">
                    <p>{this.props.text}</p>
                </div>
                <div className="aply">
                    <RaisedButton id="apply" text="Apply" className="apply" onClick={this.props.onClick} />
                </div>
            </div>
        );
    }
}