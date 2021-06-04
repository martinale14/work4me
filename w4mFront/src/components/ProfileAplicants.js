import { React, Component } from 'react';

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
            idCity: null,
            selectedCity: ''
        }

        if (this.state.cities.length <= 0) {
            this.fetchCities();
        }
        if (this.state.selectedCity) {
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
        fetch(`${link}/userCandidate/${this.props.idCandidate}`, {
            method: 'POST',
            body: JSON.stringify({
                "id": this.props.idCandidate
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
                    this.setState({
                        name: '',
                        lastname: '',
                        id: '',
                        email: '',
                        phoneNumber: '',
                        birthday: '',
                        idCity: null,
                        selectedCity: 'usbekistan'
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
                "idCandidate": this.props.idCandidate
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
            <div>
                <Input id="name" type="text" placeholder="Name" className="inp left" value={this.state.name} />
                <Input id="lastname" type="text" placeholder="Lastname" className="inp right" value={this.state.lastname} />
                <Input id="id" type="number" placeholder="Identification" className="inp left" value={this.state.id} />
                <Autocomplete
                    value={this.state.selectedCity}
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
                                selectedCity: data.target.textContent,
                                idCity: idC[0].idCity
                            });
                        }
                    }}
                />
                <Input id="date-picker-dialog" type="text" placeholder="Birthday" className="inp left" value={this.state.birthday} />
                <Input id="phone" type="number" placeholder="Phone number" className="inp right" value={this.state.phoneNumber} onChange={(data) => this.setState({ phoneNumber: data.target.value })} />
                <Input id="email" type="text" placeholder="Email" className="inp pic" value={this.state.email} onChange={(data) => this.setState({ email: data.target.value })} />
                <div id="submit" className="submit">
                    <Btn text="Sign up" onClick={() => {
                        console.log(this.state);
                        if (this.state.name && this.state.lastname && this.state.birthday && this.state.idCity
                            && this.state.id && this.state.email && this.state.phoneNumber) {

                            this.updateCandidate();

                        } else {
                            alert('Completa todos los campos');
                        }
                    }} />
                </div>

            </div>
        );
    }

}