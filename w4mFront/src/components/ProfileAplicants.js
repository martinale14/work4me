import { React, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "../css/register.scss";
import '../css/homeCompany.scss'
import RaisedButton from '../components/RaisedButton';
import Input from '../components/Input';

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
            description: null,
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

    componentWillReceiveProps(nextProps) {
        this.fetchMyData(nextProps.id);
        this.setState()
    }

    fetchCities() {
        fetch(`/api/cities`)
            .then(res => res.json())
            .then(data => {
                this.setState({ cities: data });
            })
            .catch(err => console.error(err));
    }

    fetchMyData(id) {
        id = id ? id : this.props.id
        fetch(`/api/userCandidate/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                "id": id
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
        fetch(`/api/register/candidate/edit`, {
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
            <div className="profile">
                <Input id="name" type="text" placeholder="Name" className="inpPro leftPro" value={this.state.name} />
                <Input id="lastname" type="text" placeholder="Lastname" className="inpPro rightPro" value={this.state.lastname} />
                <Input id="id" type="number" placeholder="Identification" className="inpPro leftPro" value={this.state.id} />
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
                        className="inpPro rightPro"
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
                <Input id="date-picker-dialog" type="text" placeholder="Birthday" className="inpPro leftPro" value={this.state.birthday} />
                <Input id="phone" type="number" placeholder="Phone number" className="inpPro rightPro" value={this.state.phoneNumber} onChange={(data) => this.setState({ phoneNumber: data.target.value })} />
                <Input id="email" type="text" placeholder="Email" className="inpPro picPro" value={this.state.email} onChange={(data) => this.setState({ email: data.target.value })} />
                <div className="inpPro multi">
                    <InputMultiline id="id" type="text" placeholder="Description" className="multi2" value={this.state.description} onChange={(data) => this.setState({ description: data.target.value })} />
                    {
                        this.props.edit ?
                            <div id="submit" className="submitPro">
                                <RaisedButton text="Update" onClick={() => { this.updateCandidate() }} />
                            </div> : null
                    }
                </div>
            </div>
        );
    }

}