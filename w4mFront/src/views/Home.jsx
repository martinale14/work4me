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
import myphoto from '../assets/userDefault.png';
import AppCard from '../components/AppCard';
import CloseIcon from '@material-ui/icons/Close';

export default class Home extends Component {

    _images = [];
    _decode = [];
    _pdfData = null;

    constructor(props) {
        super(props);
        this.state = {
            value: [0, 100],
            categories: [],
            cities: [],
            vacancies: [],
            idCity: '',
            idCat: '',
            idVacant: '',
            idCandidate: '',
            pdf: '',
            applications: [],
        }
    }

    handleFile = () => {
        this.fileSelector.click();
    }

    componentDidMount() {

        this.fileSelector = buildFileSelector();
        this.fileSelector.addEventListener('change', (event) => {
            if(event.target.files.length === 0){
                let im = this._pdfData
                this.setState({ pdf: im });
            }else{
                let file = event.target.files[0];
                this._pdfData = file;
                this.setState({ pdf: URL.createObjectURL(file) });
            }
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

    apply() {
        fetch(`${link}/applications/add`, {
            method: 'POST',
            body: JSON.stringify({
                "idVacant": this.state.idVacant,
                "idCandidate": this.state.idCandidate,
                "cv": this._pdfData
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data.msg))
            .catch(err => console.error(err))

        alert("Successful request")
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
                    <img id="imagencita" src={logo} alt="w4m"/>
                </div>
                <div className="left-bar">
                    <div onClick={() => {
                        const hom = document.getElementById("home");
                        const ap = document.getElementById("app");
                        const rb = document.getElementById("rightbar");

                        hom.setAttribute('style', `display: flex !important`);
                        ap.setAttribute('style', `display: none !important`);
                        rb.setAttribute('style', `display: flex !important`);
                    }}>
                        <FormatIndentIncreaseIcon className="icons" />
                        <p>Home</p>
                    </div>
                    <div onClick={() => {
                        const hom = document.getElementById("home");
                        const ap = document.getElementById("app");
                        const rb = document.getElementById("rightbar");

                        hom.setAttribute('style', `display: none !important`);
                        ap.setAttribute('style', `display: flex !important`);
                        rb.setAttribute('style', `display: none !important`);
                    }}>
                        <ContactMailIcon className="icons" />
                        <p>Applications</p>
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
                        element.nameCity = element.nameCity ? element.nameCity : 'Telecommuting'
                        return (<Card key={element.idVacant}
                            text={element.description}
                            salary={element.salary}
                            vacant={element.nameCategory}
                            city={element.nameCity}
                            nameCompany={element.nameCompany}
                            image={this._decode[i] ? this._decode[i] : this._images[i]}
                            onClick={() => {
                                const pdf = document.getElementById("alert");
                                pdf.setAttribute('style', 'display: flex !important');
                                this.setState({
                                    idVacant: element.idVacant,
                                    idCandidate: this.props.match.params.id
                                });
                            }}
                        />)
                    })}
                    <br /><br />
                </div>
                <div id="app" className="feed apl">
                    <AppCard status="true"/>
                    <AppCard status="false"/>
                </div>

                {/* Termina el feed */}

                <div id="rightbar" className="right-bar">
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
                            }else{
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
                            }else{
                                this.setState({
                                    idCity: ''
                                });
                            }
                        }}
                    />
                    <Slider value={this.state.value} className="slide"
                        onChange={(event, newValue) => { this.setState({ value: newValue }) }} />
                    <Btn id="filter" onClick={() => {

                        let filterBody = {}
                        filterBody.city = (this.state.idCity) ? this.state.idCity : null;
                        filterBody.category = (this.state.categories) ? this.state.idCat : null;
                        filterBody.minSalary = (this.state.value[0] !== 0) ? this.state.value[0] * 1000000 : null;
                        filterBody.maxSalary = (this.state.value[1] !== 100) ? this.state.value[1] * 1000000 : null;

                        console.log(this.state.value);
                        console.log(filterBody.minSalary, filterBody.maxSalary);

                        if(filterBody.city || filterBody.category || filterBody.maxSalary || filterBody.minSalary){
                            fetch(`${link}/vacancies/filter`, {
                                method: 'POST',
                                body: JSON.stringify(filterBody),
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                }
                            }).then(res => res.json())
                            .then(data => {
                                if(!data.msg){
                                    this.setState({
                                        vacancies: data,
                                    });
                                }else{
                                    alert(data.msg);
                                }
                            })
                            .catch(err => console.error(err));
                        }else{
                            this.fetchVacancies();
                        }
                    }} className="filter" text="Filter" />
                </div>
                <div id="alert" className="alert">
                    <div className="close" onClick={() => {
                        const pdf = document.getElementById("alert");
                        pdf.setAttribute('style', 'display: none !important');
                    }}>
                        <CloseIcon/>
                    </div>
                    <div className="alertBody">
                        <p>Please browse your CV</p>
                        <div className="btnCont">
                            <Btn className="file" text="Choose file..." onClick={this.handleFile} />
                        </div>
                        <Btn className="pdfSelector" text="Send request" onClick={async () =>{
                            if(this.state.idVacant && this.state.idCandidate){
                                if(this._pdfData){
                                    this._pdfData = await readPdf(this._pdfData)
                                    this.apply();
                                }else{
                                    console.log(this.state.idVacant, this.state.idCandidate);
                                    alert("Please select your CV");
                                }
                            }else{
                                alert("Something is happening...");
                            }
                        }}/>
                    </div>
                </div>
            </div>
        )
    }
}

function readPdf(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            resolve(reader.result);

        }
        reader.onerror = reject;
    });
}

function buildFileSelector() {

    const fileSelector = document.createElement("input");
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', '.pdf');

    return fileSelector;
}

function decode(arr) {
    return new Promise((res, rej) => {
        res(decodeURIComponent(escape(window.atob(btoa(arr.data.reduce((data, byte) => data + String.fromCharCode(byte), ''))))))
    });
}