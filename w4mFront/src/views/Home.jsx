import { React, Component } from 'react';
import Card from '../components/WorkCard';
import "../css/home.scss";
import logo from '../assets/w4mLogo.png';
import Slider from '../components/Slider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { link } from '../assets/url.json';
import TextField from '@material-ui/core/TextField';
import Btn from '../components/Btn';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import myphoto from '../assets/userDefault.png';
import AppCard from '../components/AppCard';

export default class Home extends Component {

    _images = [];
    _decode = [];

    constructor(props) {
        super(props);
        this.state = {
            value: [0, 100],
            categories: [],
            cities: [],
            vacancies: [],
            idCity: '',
            idCat: '',
            applications: [],
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
        fetch(`${link}/cities`)
            .then(res => res.json())
            .then(data => {
                this.setState({ cities: data });
            })
            .catch(err => console.error(err));
    }

    async fetchVacancies() {
        fetch(`${link}/vacancies`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    vacancies: data,
                });

            })
            .catch(err => console.error(err));
    }

    fetchCategories() {
        fetch(`${link}/categories`)
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
                    <img id="imagencita" src={logo} alt="w4m"/>
                </div>
                <div className="left-bar">
                    <div onClick={() => {
                        const hom = document.getElementById("home");
                        const ap = document.getElementById("app");

                        hom.setAttribute('style', `display: flex !important`);
                        ap.setAttribute('style', `display: none !important`);
                    }}>
                        <FormatIndentIncreaseIcon className="icons" />
                        <p>Home</p>
                    </div>
                    <div onClick={() => {
                        const hom = document.getElementById("home");
                        const ap = document.getElementById("app");

                        hom.setAttribute('style', `display: none !important`);
                        ap.setAttribute('style', `display: flex !important`);
                    }}>
                        <ContactMailIcon className="icons" />
                        <p>Applications</p>
                    </div>
                    <div>
                        <NotificationsIcon className="icons" />
                        <p>Notifications</p>
                    </div>
                    <Btn id="signOut" onClick={() => {
                        console.log("hola");
                        fetch(`${link}/logout`)
                            .then(res => res.text())
                            .then(data => {
                                if(data === "Desconectado"){
                                    this.props.history.push("/");
                                }
                            })
                            .catch(err => console.error(err));
                    }} className="sign-out" text="Sign out" />
                </div>

                {/* Empieza el feed */}

                <div id="home" className="feed home">
                    {this.state.vacancies.map((element, i) => {
                        this._images[i] = myphoto;
                        decode(element.logo)
                            .then(data => {
                                if (!this._decode[i]) {
                                    this._decode[i] = data;
                                    this.setState({});
                                }
                            });

                        return (<Card key={element.idVacant}
                            text={element.description}
                            salary={element.salary}
                            nameCompany={element.nameCompany}
                            image={this._decode[i] ? this._decode[i] : this._images[i]}
                        />)
                    })}
                    <br /><br />
                </div>
                <div id="app" className="feed apl">
                    <AppCard status="true"/>
                    <AppCard status="false"/>
                </div>

                {/* Termina el feed */}

                <div className="right-bar">
                    <Autocomplete
                        id="combo-box-categories"
                        options={this.state.categories}
                        getOptionLabel={(option) => option.nameCategory}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                        className="inp right"
                        onChange={data => {

                            if (data.target.textContent) {
                                let idCa = this.state.categories.filter(category => category.nameCategory === data.target.textContent);
                                this.setState({
                                    idCat: idCa[0].idCategory
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
                            }
                        }}
                    />
                    <Slider value={this.state.value} className="slide"
                        onChange={(event, newValue) => { this.setState({ value: newValue }) }} />
                    <Btn id="filter" onClick={() => {console.log("ME GOLPEASTE")}} className="filter" text="Filter" />
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