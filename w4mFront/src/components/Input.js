import { React, Component } from 'react';
import '../css/inputs.scss';

export default class Input extends Component {
    

    render() {
        return (

            <div
                className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label inputCont ${this.props.className}`}>
                <input
                    id={this.props.id}
                    className="mdl-textfield__input inputs"
                    type={this.props.type}
                    autoComplete="off"
                />
                <label
                    className="mdl-textfield__label labels">
                    {this.props.placeholder}
                </label>
            </div>

        );
    }
}