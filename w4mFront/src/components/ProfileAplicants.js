import { React, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "../css/register.scss";
import RaisedButton from '../components/RaisedButton';
import Input from '../components/Input';
import { link } from '../assets/url.json';
import InputMultiline from '../components/InputMultiline';

export default class ProfileApplicants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            id: '',
            cities: [],
            email: '',
            phoneNumber: '',
            birthday: '',
            idCity: '',
            description: '',
            selectedCity: { nameCity: '' }
        }

        if (this.state.cities.length <= 0) {
            this.fetchCities();
        }
        if (this.state.selectedCity.nameCity === '') {
            console.log('hola');
            this.fetchMyData();
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

    fetchMyData() {
        fetch(`${link}/userCandidate/${this.props.id}`, {
            method: 'POST',
            body: JSON.stringify({
                "id": this.props.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.msg) {
                    alert(data.msg)
                } else {
                    let bt = data.birthday.split('-');
                    bt[2] = bt[2].charAt(1) === 'T' ? bt[2].charAt(0) : bt[2].charAt(0) + bt[2].charAt(1);
                    let sel = this.state.cities.filter((city) => city.idCity === data.idCityfk);
                    this.setState({
                        name: data.name1,
                        lastname: data.lastName1,
                        id: data.idCandidate,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        birthday: bt.join('-'),
                        idCity: data.idCityfk,
                        selectedCity: sel[0],
                        description: data.description ? data.description : ''
                    });
                }
            })
            .catch(err => console.error(err))
    }

    updateCandidate() {
        fetch(`${link}/register/candidate/edit`, {
            method: 'PUT',
            body: JSON.stringify({
                "email": this.state.email,
                "phoneNumber": this.state.phoneNumber,
                "idCity": this.state.idCity,
                "description": this.state.description,
                "idCandidate": this.props.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => alert(data.msg))
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="reg">
                <Input id="name" type="text" placeholder="Name" className="inp left" value={this.state.name} />
                <Input id="lastname" type="text" placeholder="Lastname" className="inp right" value={this.state.lastname} />
                <Input id="id" type="number" placeholder="Identification" className="inp left" value={this.state.id} />
                <div style={{ width: '100px' }} />
                {this.state.name ?
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.state.cities}
                        defaultValue={this.state.selectedCity}
                        getOptionLabel={(option) => option.nameCity}
                        style={{ width: 150 }}
                        renderInput={(params) => {

                            return (<TextField {...params} label="City" />);

                        }}
                        className="inp"
                        onChange={data => {
                            if (data.target.textContent) {
                                let idC = this.state.cities.filter(city => city.nameCity === data.target.textContent);
                                this.setState({
                                    idCity: idC[0].idCity
                                });
                            }
                        }}
                    /> : null
                }
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Input id="date-picker-dialog" type="text" placeholder="Birthday" className="inp" value={this.state.birthday} />
                    <div style={{ width: '20px' }} />
                    <Input id="phone" type="number" placeholder="Phone number" className="inp" value={this.state.phoneNumber} onChange={(data) => this.setState({ phoneNumber: data.target.value })} />
                </div>
                <Input id="email" type="text" placeholder="Email" className="inp" value={this.state.email} onChange={(data) => this.setState({ email: data.target.value })} />
                <InputMultiline id="id" type="text" placeholder="Description" className="inp" value={this.state.description} onChange={(data) => this.setState({ description: data.target.value })} />
                <br />
                <br />
                {
                    this.props.edit ?
                        <div id="submit" className="submit">
                            <RaisedButton text="Update" onClick={() => { this.updateCandidate() }} />
                        </div> : null
                }

            </div>
        );
    }

}