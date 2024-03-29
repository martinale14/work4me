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
                    <p className="comp-name">{this.props.nameCompany}</p>
                </div>
                <div className="job">
                    <p className="salary"> {`${this.props.category} / $${this.props.salary} / ${this.props.city}`}</p>
                </div>
                <div className="description">
                    <p>{this.props.text}</p>
                </div>

                <div className="aply">
                    <RaisedButton id="apply" text="View Applicants" className="apply" onClick={this.props.onClickView} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <RaisedButton id="apply" text="Delete Offer" className="apply" onClick={this.props.onClickDelete} />
                </div>
            </div>
        );
    }
}