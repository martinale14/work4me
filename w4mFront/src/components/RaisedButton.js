import { React, Component } from 'react';
import '../css/raised.scss';

export default class RaisedButton extends Component {
    render() {
        return (
            <span className={`btn2 ${this.props.className}`} onClick={this.props.onClick}>
                {this.props.text}
            </span>
        );
    }
}