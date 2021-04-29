import { React, Component } from 'react';
import '../css/buttons.scss';

export default class Button extends Component {

    render() {
        return (
            <button
                className={`mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn 
                ${this.props.className}`}
                onClick={this.props.onClick}
            >
                {this.props.text}
            </button>
        );
    }

}