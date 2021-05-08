import { React, Component } from 'react';
import '../css/file.scss'
import Btn from '../components/Btn';
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from '../assets/userDefault.png'; 

export default class FileChooser extends Component {

    constructor(props){
        super(props);
        this.state = {
            imagePreview: MyPhoto
        }
    }

    componentDidMount(){
        this.fileSelector = buildFileSelector();
        this.fileSelector.addEventListener('change', (event) => {
            this.setState({imagePreview: URL.createObjectURL(event.target.files[0])});
            console.log(typeof(this.state.imagePreview));
            console.log(this.state.imagePreview);
        });

        this.dropArea = document.getElementById("img");
        this.dropArea.addEventListener('dragover', (event) => {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy"
        })
        this.dropArea.addEventListener('drop', (event) => {
            event.stopPropagation();
            event.preventDefault();
            this.setState({imagePreview: URL.createObjectURL(event.dataTransfer.files[0])})
        })
    }

    handleFile = () => {
        this.fileSelector.click();
    }

    render() {
        return (
            <div className={`btnCont ${this.props.className}`}>
                <div id="img">
                    <ReactRoundedImage
                        image={this.state.imagePreview}
                        roundedColor="#321124"
                        imageWidth="70"
                        imageHeight="70"
                        roundedSize="0"
                        hoverColor="#DD1144"
                        className="photo"
                    />
                </div>
                <Btn className="file" text="Choose file..." onClick={this.handleFile}/>
            </div>
        );
    }
}

function buildFileSelector(){

    const fileSelector = document.createElement("input");
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');

    return fileSelector;
}