import { React, Component } from 'react';
import '../css/buttons.scss';
import { Button } from '@material-ui/core'

export default class Btn extends Component {

    render() {
        return (
            <Button
                className={this.props.className} onClick={this.props.onClick}
            >
                {this.props.text}
            </Button>
        );
    }

}