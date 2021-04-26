import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://192.168.20.64:3000';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mensaje: 'React',
        }
        this.connectSocket = this.connectSocket.bind(this);
        this.connectSocket();
    }

    connectSocket() {
        const socket = socketIOClient(ENDPOINT);
        socket.on('FromApi', data => {
            console.log(socket.socket.sessionid);
            this.setState({ mensaje: data });
        });
    }

    render() {

        return (

            <div>
                <h1>{this.state['mensaje']}</h1>
            </div>

        );

    }

}

export default App;