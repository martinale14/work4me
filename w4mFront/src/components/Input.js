import { TextField } from '@material-ui/core';
import { React, Component } from 'react';
import '../css/inputs.scss';


export default class Input extends Component {


    render() {
        return (
            <TextField id={this.props.id}
                type={this.props.type}
                label={this.props.placeholder}
                className={`inputs ${this.props.className}`}
                onChange={this.props.onChange}
                value={this.props.value} autoComplete='off'
                inputProps={
                    {readOnly: this.props.readOnly,}
                }
                InputLabelProps={{
                    shrink: this.props.shrink,
                  }} />
        );
    }
}