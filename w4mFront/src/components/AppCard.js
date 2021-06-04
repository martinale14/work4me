import { React, Component } from 'react';
import "../css/workCard.scss";
import ReactRoundedImage from "react-rounded-image";
import RaisedButton from './RaisedButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Cancel from '@material-ui/icons/Cancel';

export default class AppCard extends Component {

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
                        roundedColor="#000000"
                        imageWidth="40"
                        imageHeight="40"
                        roundedSize="0"
                        hoverColor="#000000"
                        className="picture"
                    />
                    <p className="comp-name">{this.props.nameCompany}</p>
                    <RaisedButton id="rais" text="Cancel request" className="del" onClick={this.props.onClick}/>
                </div>
                <div className="job">
                    <p className="job2">{`${this.props.vacant} / $${this.props.salary} / ${this.props.city}`}</p>
                    <p className="desc">{this.props.text}</p>
                </div>
                <div className="iconos">
                    <div>
                        <CheckCircleIcon className="ic"/>
                        <p>Applied</p>
                    </div>
                    <div>
                        {this.props.status === 1 ? <CheckCircleIcon className="icApp"/> : <CheckCircleOutlineIcon className="ic"/>}
                        <p>Approved</p>
                    </div>
                    <div>
                        {this.props.status === 0 ? <Cancel className="icCan"/> : <HighlightOffIcon className="ic"/>}
                        <p>Rejected</p>
                    </div>
                </div>
            </div>
        );
    }
}