import {React, Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import logo from '../assets/w4mLogo.png';
import "../css/register.scss";
import Btn from '../components/Btn';
import imageBack from '../assets/BackDesignAritos.png'
import Input from '../components/Input';
import FileChooser from '../components/FileChooser'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
  

export default class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedDate: null
        }
    }

    render(){

        let cities = [
            {
                name: 'Cali'
            },
            {
                name: 'Bogotá'
            }
        ]

        return(
            <div className="grid">
                <div className="nav-bar">
                    <img src={logo} alt="w4m"/>
                </div>
                <div className="back">
                    <img id="back" src={imageBack} alt="style"/>
                    <div className="title">
                        <h1>Create your account</h1>
                        <h2>Identify yourself</h2>
                        <br/>
                        <br/>
                        <div className="select">
                            <Btn id="app" className="app" text="Applicant" onClick={() => {
                                const app = document.getElementById("app");
                                const comp = document.getElementById("comp");
                  
                                app.setAttribute('style', `background-color: rgba(255, 255, 255, 1) !important;
                                                color: rgb(17, 17, 17) !important`);
                                comp.setAttribute('style', `background-color: rgba(255, 255, 255, .18) !important;
                                                color: rgb(255, 255, 255) !important`);

                            }}/>
                            <Btn id="comp" className="comp" text="Company" onClick={() => {
                                const app = document.getElementById("app");
                                const comp = document.getElementById("comp");
    
                                app.setAttribute('style', `background-color: rgba(255, 255, 255, .18) !important;
                                                color: rgb(255, 255, 255) !important`);
                                comp.setAttribute('style', `background-color: rgba(255, 255, 255, 1) !important;
                                                color: rgb(17, 17, 17) !important`);
                            }}/>
                        </div>
                        
                    </div>
                </div>
                <div className="reg">
                    <FileChooser id="picture" className="pic"/>
                    <Input id="name" type="text" placeholder="Name" className="inp left"/>
                    <Input id="lastname" type="text" placeholder="Lastname" className="inp right"/>
                    <Input id="id" type="text" placeholder="Identification" className="inp left"/>
                    <Autocomplete
                        id="combo-box-demo"
                        options={cities}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="City" />}
                        className="inp right"
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            className="inp left"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Birthday"
                            value={this.state.selectedDate}
                            onChange={(date) => this.setState({selectedDate: date})}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <Input id="phone" type="text" placeholder="Phone number" className="inp right"/>
                    <Input id="email" type="text" placeholder="Email" className="inp pic"/>
                    <Input id="password" type="password" placeholder="Password" className="inp down"/>
                    <Input id="password2" type="password" placeholder="Password confirmation" className="inp down"/>
                    <div id="submit" className="submit">
                        <Btn text="Sign up"/>
                    </div>                   
                </div>
            </div>
        );
    }
}