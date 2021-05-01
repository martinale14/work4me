import { TextField } from '@material-ui/core';
import { React, Component } from 'react';
import '../css/inputs.scss';


export default class Input extends Component {
    

    render() {
        return (
            <TextField id="inputs" type={this.props.type} label={this.props.placeholder} className={this.props.className}/>

            /* <div
                className={this.props.className}>
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
            </div> */

        );
    }
}