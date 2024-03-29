import { React, Component } from 'react';
import Card from '../components/WorkCardCompany';
import "../css/home.scss";
import "../css/homeCompany.scss";
import logo from '../assets/w4mLogo.png';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import Btn from '../components/Btn';
import Input from '../components/Input';
import InputMultiline from '../components/InputMultiline';
import "../css/homeCompany.scss"
import myphoto from '../assets/userDefault.png';
import RaisedButton from '../components/RaisedButton';
import Profile from '../components/ProfileCompany';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default class HomeCompany extends Component {

    _images = [];
    _decode = [];

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            cities: [],
            vacancies: [],
            idCity: '',
            idCat: '',
            applications: [],
            salary: '',
            description: ''
        }
    }

    componentDidMount() {

        if (this.state.cities.length <= 0) {
            this.fetchCities();
        }

        if (this.state.vacancies.length <= 0) {
            this.fetchVacancies();
        }

        if (this.state.categories.length <= 0) {
            this.fetchCategories();
        }

    }

    fetchCities() {
        fetch(`/api/cities`)
            .then(res => res.json())
            .then(data => {
                this.setState({ cities: data });
            })
            .catch(err => console.error(err));
    }

    fetchVacancies() {
        fetch(`/api/vacancies/mine`, {
            method: 'POST',
            body: JSON.stringify({ idCompany: this.props.match.params.id }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    vacancies: data,
                });

            })
            .catch(err => console.error(err));
    }

    fetchCategories() {
        fetch(`/api/categories`)
            .then(res => res.json())
            .then(data => {
                this.setState({ categories: data });
            })
            .catch(err => console.error(err));
    }

    render() {

        return (
            <div className="gridReg">
                <div className="nav-barReg">
                    <img id="imagencita" src={logo} alt="w4m" />
                    <div>
                        <RaisedButton className="miperfil" text="My company" onClick={() => {
                            const hom = document.getElementById("home");
                            const rb = document.getElementById("rightbar");
                            const pr = document.getElementById("profile");

                            hom.setAttribute('style', `display: none !important`);
                            pr.setAttribute('style', `display: flex !important`);
                            rb.setAttribute('style', `display: none !important`);
                        }} />
                    </div>
                </div>

                <div className="profi2" style={{ display: 'none', width: '100%' }} id='profile'>
                    <div className="backto" onClick={() => {
                        const hom = document.getElementById("home");
                        const rb = document.getElementById("rightbar");
                        const pr = document.getElementById("profile");

                        hom.setAttribute('style', `display: flex !important`);
                        pr.setAttribute('style', `display: none !important`);
                        rb.setAttribute('style', `display: flex !important`);
                    }}>
                        <ArrowBackIcon className="backIcon2" />
                    </div>
                    <Profile id={this.props.match.params.id} />
                </div>
                {/* Empieza el feed */}

                <div id="home" className="feedCompany home">
                    {this.state.vacancies.length > 0 ? this.state.vacancies.map((element, i) => {
                        this._images[i] = myphoto;
                        decode(element.logo)
                            .then(data => {
                                if (!this._decode[i]) {
                                    this._decode[i] = data;
                                    this.setState({});
                                }
                            });
                        element.nameCity = element.nameCity ? element.nameCity : 'Telecommuting';
                        return (<Card key={element.idVacant}
                            text={element.description}
                            salary={element.salary}
                            nameCompany={element.nameCompany}
                            category={element.nameCategory}
                            city={element.nameCity}
                            image={this._decode[i] ? this._decode[i] : this._images[i]}
                            onClickView={() => {
                                this.props.history.push(`/Home/company/applications/${element.idVacant}/${this.props.match.params.id}`);
                            }}
                            onClickDelete={() => {
                                fetch(`/api/vacancies/delete`, {
                                    method: 'DELETE',
                                    body: JSON.stringify({
                                        idVacant: element.idVacant
                                    }),
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        alert(data.msg);
                                        this.fetchVacancies();
                                    })
                                    .catch(err => console.error(err));
                            }}
                        />)
                    }) : null}
                    <br /><br />
                </div>

                {/* Termina el feed */}

                <div id="rightbar" className="right-bar">
                    <Autocomplete
                        id="combo-box-categories"
                        options={this.state.categories}
                        getOptionLabel={(option) => option.nameCategory}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Category *" />}
                        className="inp right"
                        onChange={data => {

                            if (data.target.textContent) {
                                let idCa = this.state.categories.filter(category => category.nameCategory === data.target.textContent);
                                this.setState({
                                    idCat: idCa[0].idCategory
                                });
                            } else {
                                this.setState({
                                    idCat: ''
                                });
                            }
                        }}
                    />
                    <Autocomplete
                        id="combo-box-cities"
                        options={this.state.cities}
                        getOptionLabel={(option) => option.nameCity}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="City" />}
                        className="inp right"
                        onChange={data => {
                            if (data.target.textContent) {
                                let idC = this.state.cities.filter(city => city.nameCity === data.target.textContent);
                                this.setState({
                                    idCity: idC[0].idCity
                                });
                            } else {
                                this.setState({
                                    idCity: ''
                                });
                            }
                        }}
                    />
                    <Input id="id" type="number" placeholder="Salary *" className="inp" value={this.state.salary} onChange={(data) => this.setState({ salary: data.target.value })} />
                    <InputMultiline id="id" type="text" placeholder="Description *" className="inp" value={this.state.description} onChange={(data) => this.setState({ description: data.target.value })} />

                    <Btn id="filter" onClick={() => {

                        if (this.state.idCat && this.state.salary && this.state.description) {

                            if (this.state.description.length <= 350) {

                                let request = {
                                    description: this.state.description,
                                    salary: this.state.salary,
                                    idCategory: this.state.idCat,
                                    idCompany: this.props.match.params.id
                                }

                                if (this.state.idCity) {
                                    request.idCity = this.state.idCity;
                                }

                                fetch(`/api/vacancies/add`, {
                                    method: 'POST',
                                    body: JSON.stringify(request),
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (!data.msg) {
                                        } else {
                                            alert(data.msg);
                                            this.fetchVacancies();
                                        }
                                    })
                                    .catch(err => console.error(err));
                            } else {
                                alert(`Description only allows 350 characters and you have ${this.state.description.length}`)
                            }

                        } else {
                            alert('Por favor llene todos los campos marcados con *')
                        }
                    }} className="filter" text="Publish" />
                    <Btn id="signOut" onClick={() => {
                        console.log("hola");
                        fetch(`/api/logout`)
                            .then(res => res.text())
                            .then(data => {
                                if (data === "Desconectado") {
                                    this.props.history.push("/");
                                }
                            })
                            .catch(err => console.error(err));
                    }} className="sign-out" text="Sign out" />
                </div>
            </div>
        )
    }
}

function decode(arr) {
    return new Promise((res, rej) => {
        res(decodeURIComponent(escape(window.atob(btoa(arr.data.reduce((data, byte) => data + String.fromCharCode(byte), ''))))))
    });
}