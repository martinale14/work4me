import Slider from '@material-ui/core/Slider';
import Input from './Input'
import { React, Component } from 'react';
import Grid from '@material-ui/core/Grid';
import '../css/slider.scss'

export default class Slide extends Component{

    constructor(props){
        super(props);
        this.state = {
            
        }
        this.valuetext = this.valuetext.bind(this);
    }

    render(){
        return(
            <div className={this.props.className}>
                <p>Salary:</p>
                <Grid container spacing={2}>
                    <Grid item>
                        <Input className="values" type="text" value={this.minMax(0, this.props.value)} 
                            readOnly={true}
                        />
                    </Grid>
                    <Grid item>
                        <Input className="values" type="text" value={this.minMax(1, this.props.value)} 
                            readOnly={true}
                        />
                    </Grid>
                </Grid>
                <Slider
                    value={this.props.value}
                    onChange={this.props.onChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={this.valuetext}
                    className="range"
                />
                
            </div>
        );
    }

    valuetext(){
        return `${this.state.value}M`;
    }

    minMax(i, data){
        return(i === 0 ? (data[0]===0 ? 'Min' : `${data[0]}M`) : (data[1]===100 ? 'Max' : `${data[1]}M`))
    }

}