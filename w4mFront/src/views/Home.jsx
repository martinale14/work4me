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

export default class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value: [0, 100],
            categories: [],
            cities: [],
        }
    }

    componentDidMount(){

        if (this.state.cities.length <= 0) {
            this.fetchCities();
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

    render(){

        return(
            <div className="gridReg">
                <div className="nav-barReg">
                    <img src={logo} alt="w4m" />
                </div>
                <div className="left-bar">
                    <div>
                        <FormatIndentIncreaseIcon className="icons"/>
                        <p>Home</p>
                    </div>
                    <div>
                        <ContactMailIcon className="icons"/>
                        <p>Applications</p>
                    </div>
                    <div>
                        <NotificationsIcon className="icons"/>
                        <p>Notifications</p>
                    </div>
                    <Btn id="signOut" onClick={() => {console.log('ME HAS GOLPEADO')}} className="sign-out" text="Sign out" />
                </div>
                <div className="feed">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <div className="right-bar">
                    <Autocomplete
                        id="combo-box-categories"
                        options={this.state.categories}
                        getOptionLabel={(option) => option.nameCity}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                        className="inp right"
                        onChange={data => {

                            if (data.target.textContent) {
                                let idC = this.state.categories.filter(city => city.nameCity === data.target.textContent);
                                this.setState({
                                    idCity: idC[0].idCity
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
                        onChange={(event, newValue) => {this.setState({value: newValue})}}/>
                    <Btn id="filter" onClick={() => {console.log('ME HAS GOLPEADO')}} className="filter" text="Filter" />
                </div>
            </div>
        )

    }

}