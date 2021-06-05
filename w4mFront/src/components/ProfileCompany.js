import { React, Component } from 'react';
import "../css/register.scss";
import Input from './Input';
import { link } from '../assets/url.json';


export default class ProfileCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            compName: '',
            compEmail: '',
            compNumber: '',
            tin: ''
        }

        if (this.state.tin === '') {
            this.fetchMyData();
        }

    }

    fetchMyData() {
        fetch(`${link}/userCompany/${this.props.id}`, {
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
                        compName: data.nameCompany,
                        compEmail: data.companyEmail,
                        compNumber: data.phoneNumber,
                        tin: data.tin
                    });
                }
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Input id="compName" type="text" placeholder="Company's name" className="inp up" value={this.state.compName} />
                    <Input id="tin" type="number" placeholder="T.I.N." className="inp left" value={this.state.tin} />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Input id="compNumber" type="number" placeholder="Company's number" className="inp right" value={this.state.compNumber} />
                    <Input id="compEmail" type="text" placeholder="Email" className="inp pic" value={this.state.compEmail} />
                </div>
            </div>
        );
    }

}