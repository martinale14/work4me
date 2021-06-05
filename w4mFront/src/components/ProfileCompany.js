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

    componentWillReceiveProps(nextProps){
        this.fetchMyData(nextProps.id);
        this.setState()
    }

    fetchMyData(id) {
        id = id ? id : this.props.id
        fetch(`${link}/userCompany/${id}`, {
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
            <div className="profile2">
                <Input id="compName" type="text" placeholder="Company's name" className="upPro" value={this.state.compName} />
                <div className="prop">
                    <Input id="tin" type="number" placeholder="T.I.N." className="leftPro2" value={this.state.tin} />
                    <Input id="compNumber" type="number" placeholder="Company's number" className="rightPro2" value={this.state.compNumber} />
                </div>
                <Input id="compEmail" type="text" placeholder="Email" className="upPro" value={this.state.compEmail} />
            </div>
        );
    }

}