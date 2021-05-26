import { React, Component } from 'react';
import Card from '../components/WorkCard'
import "../css/home.scss";
import logo from '../assets/w4mLogo.png';
import Slider from '../components/Slider'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { link } from '../assets/url.json';
import TextField from '@material-ui/core/TextField';
import Btn from '../components/Btn'
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import myphoto from '../assets/userDefault.png';

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
                    <div>
                        <FormatIndentIncreaseIcon className="icons" />
                        <p>Home</p>
                    </div>
                    <div>
                        <ContactMailIcon className="icons" />
                        <p>Applications</p>
                    </div>
                    <div>
                        <NotificationsIcon className="icons" />
                        <p>Notifications</p>
                    </div>
                    <Btn id="signOut" onClick={() => { console.log('ME HAS GOLPEADO') }} className="sign-out" text="Sign out" />
                </div>
                <div className="feed">
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
                </div>
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
                    <Btn id="filter" onClick={() => { console.log('ME HAS GOLPEADO') }} className="filter" text="Filter" />
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