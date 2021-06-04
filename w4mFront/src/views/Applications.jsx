import { React, Component } from 'react';
import Card from '../components/WorkCardApplication';
import "../css/home.scss";
import logo from '../assets/w4mLogo.png';
import { link } from '../assets/url.json';
import "../css/homeCompany.scss"
import myphoto from '../assets/userDefault.png';


export default class Applications extends Component {

    _imgs = [];
    _decode = [];

    constructor(props) {
        super(props);
        this.state = {
            applications: [],
        }
    }

    componentDidMount() {
        if (this.state.applications.length <= 0) {
            this.fetchApplications();
        }
    }

    fetchApplications() {
        fetch(`${link}/applications/requests`, {
            method: 'POST',
            body: JSON.stringify({ idVacancy: this.props.match.params.idVacant }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({
                        applications: data,
                    });
                } else {
                    alert(data.msg);
                    this.props.history.push(`/Home/company/${this.props.match.params.id}`);
                }

            })
            .catch(err => console.error(err));
    }

    updateStatus(status, id) {
        fetch(`${link}/applications/edit`, {
            method: 'PUT',
            body: JSON.stringify({ idApplication: id, approved: status }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.fetchApplications();
            })
            .catch(err => console.error(err));
    }

    render() {

        return (
            <div className="gridRegAp">
                <div className="nav-barReg">
                    <img id="imagencita" src={logo} alt="w4m" />
                </div>

                {/* Empieza el feed */}

                <div id="home" className="feedCompany feedAp home">
                    {this.state.applications.map((element, i) => {
                        this._imgs[i] = myphoto;
                        decode(element.profilePic)
                            .then(data => {
                                if (!this._decode[i]) {
                                    this._decode[i] = data;
                                    this.setState({});
                                }
                            });
                        console.log(element.approved);
                        return (<Card key={element.idApplication}
                            nameCompany={`${element.name1} ${element.lastName1}`}
                            image={this._decode[i] ? this._decode[i] : this._imgs[i]}
                            onClickView={() => {
                                alert('view');
                            }}
                            status={element.approved}
                            onClickAprove={() => { this.updateStatus(1, element.idApplication) }}
                            onClickReject={() => { this.updateStatus(0, element.idApplication) }}
                        />)
                    })}
                    <br /><br />
                </div>

                {/* Termina el feed */}

                <div id="rightbar" className="right-barAp">

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