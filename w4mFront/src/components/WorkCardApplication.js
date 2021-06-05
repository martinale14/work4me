import { React, Component } from 'react';
import '../css/workCard.scss';
import ReactRoundedImage from 'react-rounded-image';
import RaisedButton from './RaisedButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Cancel from '@material-ui/icons/Cancel';
export default class WorkCard extends Component {

    aprobar(status) {
        if (status === 1) {
            return (<div><CheckCircleIcon className="icApp" /></div>)
        } else {
            return (<div><CheckCircleOutlineIcon className="ic" /></div>)
        }
    }

    rechazar(status) {
        if (status !== 0) {
            return (<div><HighlightOffIcon className="ic" /></div>)
        } else {
            return (<div><Cancel className="icCan" /></div>)
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
                    <RaisedButton text={this.props.nameCompany} className="comp-name" onClick={this.props.onClickProfile} />
                    <RaisedButton id="rais" text="Look CV" className="del" onClick={this.props.onClickView} />
                </div>
                <div className="iconosBtn">
                    <div onClick={this.props.onClickAprove}>
                        {this.aprobar(this.props.status)}
                        <p>Approve</p>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div onClick={this.props.onClickReject}>
                        {this.rechazar(this.props.status)}
                        <p>Reject</p>
                    </div>
                </div>
            </div>
        );
    }
}