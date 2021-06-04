import { React, Component } from 'react';
import '../css/file.scss'
import Btn from '../components/Btn';
import ReactRoundedImage from "react-rounded-image";

export default class FileChooser extends Component {

    render() {
        return (
            <div className={`btnCont ${this.props.className}`}>
                <div id="img">
                    <ReactRoundedImage
                        image={this.props.image}
                        roundedColor="#000000"
                        imageWidth="70"
                        imageHeight="70"
                        roundedSize="0"
                        hoverColor="#000000"
                        className="photo"
                    />
                </div>
                <Btn className="file" text="Choose file..." onClick={this.props.onClick} />
            </div>
        );
    }
}

