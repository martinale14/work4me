import { React, Component } from 'react';
import Card from '../components/WorkCardApplication';
import "../css/home.scss";
import logo from '../assets/w4mLogo.png';
import { link } from '../assets/url.json';
import "../css/homeCompany.scss";
import myphoto from '../assets/userDefault.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PdfView from '../components/PdfView';
import ProfileCan from '../components/ProfileAplicants';

export default class Applications extends Component {

    _imgs = [];
    _decode = [];

    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            pdf: null,
            candidateId: null
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

    onDocumentLoadSuccess({ numPages: nextNumPages }) {
        this.setState({ numPages: nextNumPages });
    }

    render() {

        return (
            <div className="gridRegAp">
                <div className="nav-barReg">
                    <img id="imagencita" src={logo} alt="w4m" />
                </div>

                <div style={{ display: 'none', width: '100%' }} id='profile'>
                    {this.state.candidateId ? <ProfileCan id={this.state.candidateId} edit={false} /> : null}
                </div>
                {/* Empieza el feed */}

                <div id="home" className="feedCompany feedAp home">
                    <div className="back" onClick={() => {
                        this.props.history.push(`/Home/company/${this.props.match.params.id}`);
                    }}>
                        <ArrowBackIcon className="backIcon" />
                    </div>
                    {this.state.applications.map((element, i) => {
                        this._imgs[i] = myphoto;
                        decode(element.profilePic)
                            .then(data => {
                                if (!this._decode[i]) {
                                    this._decode[i] = data;
                                    this.setState({});
                                }
                            });
                        return (<Card key={element.idApplication}
                            nameCompany={`${element.name1} ${element.lastName1}`}
                            image={this._decode[i] ? this._decode[i] : this._imgs[i]}
                            onClickProfile={() => {
                                this.setState({ candidateId: element.idCandidate });
                                console.log(element.idCandidate);
                                const hom = document.getElementById("home");
                                const rb = document.getElementById("rightbar");
                                const pr = document.getElementById("profile");

                                hom.setAttribute('style', `display: none !important`);
                                pr.setAttribute('style', `display: flex !important`);
                                rb.setAttribute('style', `display: none !important`);
                            }}
                            onClickView={() => {
                                console.log(element);
                                decode(element.cv)
                                    .then(data => {
                                        this.setState({ pdf: data })
                                    })
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
                    {this.state.pdf ? <PdfView className="pdfFile" pdf={this.state.pdf} /> : <p className="pdv">SELECT A CV TO VIEW</p>}
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