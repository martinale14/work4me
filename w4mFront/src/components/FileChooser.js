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
                        roundedColor="#321124"
                        imageWidth="70"
                        imageHeight="70"
                        roundedSize="0"
                        hoverColor="#DD1144"
                        className="photo"
                    />
                </div>
                <Btn className="file" text="Choose file..." onClick={this.props.onClick} />
            </div>
        );
    }
}

