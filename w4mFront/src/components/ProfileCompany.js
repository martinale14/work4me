import { React, Component } from 'react';
import "../css/register.scss";
import Input from './Input';
import { link } from '../assets/url.json';


export default class ProfileCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            id: '',
            email: '',
            phoneNumber: '',
            birthday: '',
            idCity: '',
            description: '',
        }

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

                    this.setState({
                        name: data.name1,
                        lastname: data.lastName1,
                        id: data.idCandidate,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        idCity: data.idCityfk,
                        description: data.description ? data.description : ''
                    });
                }
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Input id="compName" type="text" placeholder="Company's name" className="inp up" value={this.state.compName} onChange={(data) => this.setState({ compName: data.target.value })} />
                    <Input id="tin" type="number" placeholder="T.I.N." className="inp left" value={this.state.tin} onChange={(data) => this.setState({ tin: data.target.value })} />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Input id="compNumber" type="number" placeholder="Company's number" className="inp right" value={this.state.compNumber} onChange={(data) => this.setState({ compNumber: data.target.value })} />
                    <Input id="compEmail" type="text" placeholder="Email" className="inp pic" value={this.state.compEmail} onChange={(data) => this.setState({ compEmail: data.target.value })} />
                </div>
            </div>
        );
    }

}