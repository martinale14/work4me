import { React, Component } from 'react';
import myphoto from '../assets/userDefault.png';

import ReactRoundedImage from "react-rounded-image";

export default class Prueba extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: myphoto
        }
    }

    fetchPhoto = () => {

        fetch(`/api/user/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.profilePic)
                this.setState({ image: decode(data.profilePic) });

            }).catch(err => console.error(err))

    }

    render() {
        return (
            <div>
                <ReactRoundedImage
                    image={this.state.image}
                    roundedColor="#321124"
                    imageWidth="70"
                    imageHeight="70"
                    roundedSize="0"
                    hoverColor="#DD1144"
                    className="photo"
                />
                <button onClick={this.fetchPhoto}>Click me</button>
            </div>
        );
    }

}

function decode(arr) {

    return decodeURIComponent(escape(window.atob(btoa(arr.data.reduce((data, byte) => data + String.fromCharCode(byte), '')))));
}