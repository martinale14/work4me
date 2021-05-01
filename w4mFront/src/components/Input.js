import { TextField } from '@material-ui/core';
import { React, Component } from 'react';
import '../css/inputs.scss';


export default class Input extends Component {


    render() {
        return (
            <TextField id="inputs" 
            type={this.props.type} 
            label={this.props.placeholder} 
            className={this.props.className} />
        );
    }
}