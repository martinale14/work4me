import { React, Component } from 'react';
import "../css/workCard.scss";
import ReactRoundedImage from "react-rounded-image";
import RaisedButton from './RaisedButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Cancel from '@material-ui/icons/Cancel';

export default class AppCard extends Component {

    aprobar(status){
        if(status === "true"){
            return (<div><CheckCircleIcon className="icApp"/></div>)
        }else{
            return (<div><CheckCircleOutlineIcon className="ic"/></div>)
        }
    }

    rechazar(status){
        if(status === "true"){
            return (<div><HighlightOffIcon className="ic"/></div>)
        }else{
            return (<div><Cancel className="icCan"/></div>)
        }
    }

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
                    <p className="comp-name">Company name</p>
                    <RaisedButton id="rais" text="Cancel request" className="del"/>
                </div>
                <div className="job">
                    <p className="job2">Vacancy offered</p><p className="salary">{this.props.salary}</p>
                </div>
                <div className="iconos">
                    <div>
                        <CheckCircleIcon className="ic"/>
                        <p>Applied</p>
                    </div>
                    <div>
                        {this.aprobar(this.props.status)}
                        <p>Approved</p>
                    </div>
                    <div>
                        {this.rechazar(this.props.status)}
                        <p>Rejected</p>
                    </div>
                </div>
            </div>
        );
    }
}