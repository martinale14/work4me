import { React, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import logo from '../assets/w4mLogo.png';
import "../css/register.scss";
import Btn from '../components/Btn';
import imageBack from '../assets/BackDesignAritos.png'
import Input from '../components/Input';
import FileChooser from '../components/FileChooser'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { link } from '../assets/url.json';
import MyPhoto from '../assets/userDefault.png';

export default class Register extends Component {

    _myBirth = null;
    _imageData = null;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            birthday: null,
            id: '',
            idCity: '',
            phoneNumber: '',
            imagePreview: MyPhoto,
            cities: [],
            compName: '',
            tin: '',
            compNumber: '',
            lrName: '',
            lrLastname: '',
            compEmail: '',
            compPass: '',
        }

    }

    componentDidMount() {
        this.fileSelector = buildFileSelector();
        this.fileSelector.addEventListener('change', (event) => {
            let file = event.target.files[0];
            this._imageData = file;
            this.setState({ imagePreview: URL.createObjectURL(file) });
        });

        this.dropArea = document.getElementById("img");
        this.dropArea.addEventListener('dragover', (event) => {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
        })
        this.dropArea.addEventListener('drop', (event) => {
            event.stopPropagation();
            event.preventDefault();
            let file = event.dataTransfer.files[0];
            this._imageData = file;
            this.setState({ imagePreview: URL.createObjectURL(file) });

        })

        if (this.state.cities.length <= 0) {
            this.fetchCities();
        }

    }

    handleFile = () => {
        this.fileSelector.click();
    }

    fetchCities() {
        fetch(`${link}/cities`)
            .then(res => res.json())
            .then(data => {
                this.setState({ cities: data });
            })
            .catch(err => console.error(err));
    }

    registerCandidate() {
        fetch(`${link}/register/candidate`, {
            method: 'POST',
            body: JSON.stringify({
                "id": this.state.id,
                "name": this.state.name,
                "lastName": this.state.lastname,
                "email": this.state.email,
                "password": this.state.password,
                "phoneNumber": this.state.phoneNumber,
                "idCity": this.state.idCity,
                "birthday": this._myBirth,
                "imageData": this._imageData
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data.msg))
            .catch(err => console.error(err))
    }

    registerCompany() {
        fetch(`${link}/register/company`, {
            method: 'POST',
            body: JSON.stringify({
                "tin": this.state.tin,
                "name": this.state.lrName,
                "lastName": this.state.lrLastname,
                "companyName": this.state.compName,
                "email": this.state.compEmail,
                "password": this.state.compPass,
                "phoneNumber": this.state.compNumber,
                "logo": this._imageData
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data.msg))
            .catch(err => console.error(err))
    }

    render() {

        return (
            <div className="grid">
                <div className="nav-bar">
                    <img src={logo} alt="w4m" />
                </div>
                <div className="back">
                    <img id="back" src={imageBack} alt="style" />
                    <div className="title">
                        <h1>Create your account</h1>
                        <h2>Identify yourself</h2>
                        <br />
                        <br />
                        <div className="select">
                            <Btn id="app" className="app" text="Applicant" onClick={() => {
                                const app = document.getElementById("app");
                                const comp = document.getElementById("comp");
                                const users = document.getElementById("users");
                                const companies = document.getElementById("companies");

                                app.setAttribute('style', `background-color: rgba(255, 255, 255, 1) !important;
                                                color: rgb(17, 17, 17) !important`);
                                comp.setAttribute('style', `background-color: rgba(255, 255, 255, .18) !important;
                                                color: rgb(255, 255, 255) !important`);
                                users.setAttribute('style', `display: grid !important`);
                                companies.setAttribute('style', `display: none !important`);
                            }} />
                            <Btn id="comp" className="comp" text="Company" onClick={() => {
                                const app = document.getElementById("app");
                                const comp = document.getElementById("comp");
                                const users = document.getElementById("users");
                                const companies = document.getElementById("companies");

                                app.setAttribute('style', `background-color: rgba(255, 255, 255, .18) !important;
                                                color: rgb(255, 255, 255) !important`);
                                comp.setAttribute('style', `background-color: rgba(255, 255, 255, 1) !important;
                                                color: rgb(17, 17, 17) !important`);
                                users.setAttribute('style', `display: none !important`);
                                companies.setAttribute('style', `display: grid !important`);
                            }} />
                        </div>
                    </div>
                </div>
                <div id="users" className="reg">
                    <FileChooser id="picture" className="pic" onClick={this.handleFile} image={this.state.imagePreview} />
                    <Input id="name" type="text" placeholder="Name" className="inp left" value={this.state.name} onChange={(data) => this.setState({ name: data.target.value })} />
                    <Input id="lastname" type="text" placeholder="Lastname" className="inp right" value={this.state.lastname} onChange={(data) => this.setState({ lastname: data.target.value })} />
                    <Input id="id" type="number" placeholder="Identification" className="inp left" value={this.state.id} onChange={(data) => this.setState({ id: data.target.value })} />
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.state.cities}
                        getOptionLabel={(option) => option.nameCity}
                        style={{ width: 300 }}
                        renderInput={(params) => {

                            return (<TextField {...params} label="City" />);

                        }}
                        className="inp right"
                        onChange={data => {
                            if (data.target.textContent) {
                                let idC = this.state.cities.filter(city => city.nameCity === data.target.textContent);
                                this.setState({
                                    idCity: idC[0].idCity
                                });
                            }
                        }}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className="inp left"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Birthday"
                            value={this.state.birthday}
                            onChange={(date) => this.setState({ birthday: date })}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <Input id="phone" type="number" placeholder="Phone number" className="inp right" value={this.state.phoneNumber} onChange={(data) => this.setState({ phoneNumber: data.target.value })} />
                    <Input id="email" type="text" placeholder="Email" className="inp pic" value={this.state.email} onChange={(data) => this.setState({ email: data.target.value })} />
                    <Input id="password" type="password" placeholder="Password" className="inp down" value={this.state.password} onChange={(data) => this.setState({ password: data.target.value })} />
                    <Input id="password2" type="password" placeholder="Password confirmation" className="inp down" />
                    <div id="submit" className="submit">
                        <Btn text="Sign up" onClick={async () => {

                            if (this.state.name && this.state.lastname && this.state.birthday && this.state.idCity
                                && this.state.id && this.state.email && this.state.password && this.state.phoneNumber
                                && this._imageData) {
                                let date = this.state.birthday;
                                this._myBirth = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                                this._imageData = await readImage(this._imageData);
                                this.registerCandidate();
                            } else {
                                console.log('te falta algo compa');
                            }
                        }} />
                    </div>
                </div>


                <div id="companies" className="reg2">
                    <FileChooser id="picture" className="pic" onClick={this.handleFile} image={this.state.imagePreview} />
                    <Input id="name" type="text" placeholder="Company's name" className="inp up" value={this.state.compName} onChange={(data) => this.setState({ compName: data.target.value })} />
                    <Input id="lastname" type="number" placeholder="T.I.N." className="inp left" value={this.state.tin} onChange={(data) => this.setState({ tin: data.target.value })} />
                    <Input id="id" type="number" placeholder="Company's number" className="inp right" value={this.state.compNumber} onChange={(data) => this.setState({ compNumber: data.target.value })} />
                    <Input id="id" type="text" placeholder="L.R. Name" className="inp left" value={this.state.lrName} onChange={(data) => this.setState({ lrName: data.target.value })} />
                    <Input id="phone" type="text" placeholder="L.R. Lastname" className="inp right" value={this.state.lrLastname} onChange={(data) => this.setState({ lrLastname: data.target.value })} />
                    <Input id="email" type="text" placeholder="Email" className="inp pic" value={this.state.compEmail} onChange={(data) => this.setState({ compEmail: data.target.value })} />
                    <Input id="password" type="password" placeholder="Password" className="inp down" value={this.state.compPass} onChange={(data) => this.setState({ compPass: data.target.value })} />
                    <Input id="password2" type="password" placeholder="Password confirmation" className="inp down" />
                    <div id="submit" className="submit">
                        <Btn text="Sign up" onClick={async () => {

                            console.log(this.state)
                            if (this.state.compName && this.state.compEmail && this.state.tin && this.state.compNumber
                                && this.state.compPass && this.state.lrName && this.state.lrLastname
                                && this._imageData) {
                                this._imageData = await readImage(this._imageData);
                                this.registerCompany();
                            } else {
                                console.log('te falta algo compa');
                            }
                        }
                        } />
                    </div>
                </div>
            </div>
        );
    }
}

function buildFileSelector() {

    const fileSelector = document.createElement("input");
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');

    return fileSelector;
}

function readImage(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            resolve(reader.result);

        }
        reader.onerror = reject;
    });
}