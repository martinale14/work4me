import { React, Component } from 'react';
import Card from '../components/WorkCard';
import "../css/home.scss";
import logo from '../assets/w4mLogo.png';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { link } from '../assets/url.json';
import TextField from '@material-ui/core/TextField';
import Btn from '../components/Btn';
import Input from '../components/Input';
import InputMultiline from '../components/InputMultiline';
import "../css/homeCompany.scss"
import myphoto from '../assets/userDefault.png';
import AppCard from '../components/AppCard';
import CloseIcon from '@material-ui/icons/Close';

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

    handleFile = () => {
        this.fileSelector.click();
    }

    componentDidMount() {

        this.fileSelector = buildFileSelector();
        this.fileSelector.addEventListener('change', (event) => {
            let file = event.target.files[0];
            this._imageData = file;
            this.setState({ imagePreview: URL.createObjectURL(file) });
        });

        if (this.state.cities.length <= 0) {
            this.fetchCities();
        }

        if (this.state.vacancies.length <= 0) {
            this.fetchVacancies();
        }

        if (this.state.categories.length <= 0) {
            this.fetchCategories();
        }

        if (this.state.applications.length <= 0) {
            this.fetchApplications();
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
        fetch(`${link}/vacancies/mine`, {
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

    async fetchApplications() {
        fetch(`${link}/applications`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    applications: data,
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
                    <img id="imagencita" src={logo} alt="w4m" />
                </div>

                {/* Empieza el feed */}

                <div id="home" className="feedCompany home">
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
                            onClick={() => {
                                const pdf = document.getElementById("alert");

                                pdf.setAttribute('style', 'display: flex !important');
                            }}
                        />)
                    })}
                    <br /><br />
                </div>
                <div id="app" className="feed apl">
                    <AppCard status="true" />
                    <AppCard status="false" />
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

                                fetch(`${link}/vacancies/add`, {
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
                </div>
                <div id="alert" className="alert" onClick={() => {
                    const pdf = document.getElementById("alert");
                    pdf.setAttribute('style', 'display: none !important');
                }}>
                    <div className="close" onClick={() => {
                        const pdf = document.getElementById("alert");
                        pdf.setAttribute('style', 'display: none !important');
                    }}>
                        <CloseIcon />
                    </div>
                    <div className="alertBody">
                        <p>Please browse your CV</p>
                        <div className="btnCont">
                            <Btn className="file" text="Choose file..." onClick={this.handleFile} />
                        </div>
                        <Btn className="pdfSelector" text="Send request" />
                    </div>
                </div>
            </div>
        )
    }
}

function buildFileSelector() {

    const fileSelector = document.createElement("input");
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.setAttribute('accept', '.pdf');

    return fileSelector;
}

function decode(arr) {
    return new Promise((res, rej) => {
        res(decodeURIComponent(escape(window.atob(btoa(arr.data.reduce((data, byte) => data + String.fromCharCode(byte), ''))))))
    });
}