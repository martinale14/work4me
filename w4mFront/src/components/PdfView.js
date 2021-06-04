import { React, Component } from 'react';

export default class PdfView extends Component {

    render(){
        return (
                <object alt="pdf" 
                    data={this.props.pdf} type="application/pdf" width="100%" height="100%"
                    aria-label="text">
                </object>
          );
    }
}