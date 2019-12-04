import React, { Component } from 'react';
import { connect } from 'react-redux';


import classes from './MainPage.module.scss';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxillilary';

import 'rc-time-picker/assets/index.css';
import DatePicker from 'react-date-picker';



// img
import Hair from '../../assets/hair.png';
import Nail from '../../assets/nail.png';
import Eyebrow from '../../assets/eyebrow.png';
import Makeup from '../../assets/makeup.png';
import Eyelash from '../../assets/eyelash.png';

let dateForClient = new Date() + "";
dateForClient = dateForClient.slice(0, 15);


class MainPage extends Component {

    state = {
        orderInfo: {
            service: '',
            login: '',
            masterid: '',
            hour: '10:00',
            date: dateForClient,
            description: ''
        },
        showMasters: false,
        showOrder: false,
        serviceChecked: '',
        startDate: new Date(),
        startTime: '10:00',
        masterChecked: '',
        submitButtonOn: false,
        informForm: null
    };

    componentDidMount() {
        this.setState({
            orderInfo: {
                ...this.state.orderInfo,
                login: this.props.activeUser
            }
        })
    }


    clickNextStepMasters = () => {
        console.log('fetching');
        if (this.state.showMasters === false) {
            this.setState({ showMasters: true })
        } else {
            this.setState({ showOrder: true })
        };
        if (this.state.showOrder === true) {
            if (this.state.orderInfo.masterid.length === 0 && this.state.orderInfo.service.length === 0) {
                this.setState({
                    informForm: "You have not choosed any master and service! Please make a choice!"
                })
            } else if (this.state.orderInfo.masterid.length === 0) {
                this.setState({
                    informForm: "You have not choosed any master! Please choose master"
                });
            } else if (this.state.orderInfo.service.length === 0) {
                this.setState({
                    informForm: "You have not choosed any service! Please choose service!"
                });

            } else {
                console.log(this.props.activeUser);
                let loginOrder = this.props.activeUser;
                this.setState({
                    orderInfo: {
                        ...this.state.orderInfo,
                        login: loginOrder
                    }
                });
                console.log(this.state.orderInfo);
                let data = { ...this.state.orderInfo };
                data = JSON.stringify(data);
                if (this.state.showMasters === true && this.state.showOrder === true) {
                    fetch("/order", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: data
                    }).then(response => {
                        response.json().then(body => {
                            if (body.res === "Success! Your seans was added! Check your orders") {
                                this.setState({
                                    informForm: body.res
                                })
                            } else {
                                this.setState({
                                    informForm: body.res
                                })
                            }
                            console.log(body);
                        });
                    });
                }
            }
        }

    }

    onChangeRadioServiceHandler = (event) => {
        this.setState({
            serviceChecked: event.target.name,
            orderInfo: {
                ...this.state.orderInfo,
                service: event.target.name
            }
        });
    };

    onChangeRadioMasterHandler = (event) => {
        this.setState({
            masterChecked: event.target.name,
            orderInfo: {
                ...this.state.orderInfo,
                masterid: event.target.name
            }
        });
    };

    onChangeDateHandler = (date) => {
        let formattingData = date + '';
        formattingData = formattingData.slice(0, 15);
        this.setState({
            orderInfo: {
                ...this.state.orderInfo,
                date: `${formattingData}`
            },
            startDate: date
        });
    };

    onChangeTimeHandler = (event) => {
        // let formattingTime = time + '';
        this.setState({
            orderInfo: {
                ...this.state.orderInfo,
                hour: event.target.value
            },
            startTime: event.target.value
        });
    };

    onChangeHandlerDescription = (event) => {
        this.setState({
            orderInfo: {
                ...this.state.orderInfo,
                description: `${event.target.value}`
            }
        });
    };

    render() {
        let buttonNext = "Next Step";
        if (this.state.showMasters === true && this.state.showOrder === true) {
            buttonNext = "Submit order";
        }

        let informationAboutRequestOrder = null;
        if (this.state.informForm === 'Success! Your seans was added! Check your orders') {
            informationAboutRequestOrder = <p style={{ fontSize: '18px', color: 'green' }}>{this.state.informForm}</p>
        } else {
            informationAboutRequestOrder = <p style={{ fontSize: '18px', color: 'red' }}>{this.state.informForm}</p>
        }

        let masters = null;
        let orders = null;
        if (this.state.showMasters === true) {
            masters = (
                <Aux>
                    <h2>Choose your master</h2>
                    <form className={classes.Services}>
                        <label htmlFor="master1">
                            <input type="radio" id="master1" name="1" className={classes.Service} onChange={this.onChangeRadioMasterHandler} checked={this.state.orderInfo.masterid === '1'} />
                            <div className={classes.Box}>
                                <span>Master#1</span>
                            </div>
                        </label>
                        <label htmlFor="master2">
                            <input type="radio" id="master2" name="2" className={classes.Service} onChange={this.onChangeRadioMasterHandler} checked={this.state.orderInfo.masterid === '2'} />
                            <div className={classes.Box}>
                                <span>Master#2</span>
                            </div>
                        </label>
                    </form>
                </Aux>
            );
        };


        if (this.state.showOrder === true) {
            orders = (
                <Aux>
                    <h2>Order your session</h2>
                    <div className={classes.Order}>
                        <div>
                            <h2>We working without weekend during 10:00-18:00</h2>
                        </div>
                        <div>
                            <h3>Every seans dures 1 hour</h3>
                            <DatePicker
                                value={this.state.startDate}
                                onChange={this.onChangeDateHandler}
                                minDate={new Date()}
                            />
                            <div>
                                <input
                                    style={{ width: '151px', height: '25px', fontSize: '15px' }}
                                    max="18:00"
                                    min="10:00"
                                    type="time"
                                    step="3600"
                                    value={this.state.startTime}
                                    onChange={this.onChangeTimeHandler} />
                            </div>

                        </div>
                        <div>
                            <h3>Descript your wish and we will call you:</h3>
                            <textarea
                                rows="10" cols="30"
                                value={this.state.orderInfo.description}
                                onChange={this.onChangeHandlerDescription}>Input what exact you need</textarea>
                        </div>
                    </div>
                </Aux>

            );
        };

        return (
            <div className={classes.Main}>
                <h2>Our Services</h2>
                <form className={classes.Services}>
                    <label htmlFor="hair">
                        <input type="radio" id="hair" name="hair" className={classes.Service} onChange={this.onChangeRadioServiceHandler} checked={this.state.serviceChecked === 'hair'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Hair})`, backgroundSize: 'cover' }}>
                            <span>Haircut, dyeing, hairdo</span>
                        </div>
                    </label>
                    <label htmlFor="nail">
                        <input type="radio" id="nail" name="nail" className={classes.Service} onChange={this.onChangeRadioServiceHandler} checked={this.state.serviceChecked === 'nail'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Nail})`, backgroundSize: 'cover' }}>
                            <span>Manicure, pedicure</span>
                        </div>
                    </label>
                    <label htmlFor="eyebrow">
                        <input type="radio" id="eyebrow" name="eyebrow" className={classes.Service} onChange={this.onChangeRadioServiceHandler} checked={this.state.serviceChecked === 'eyebrow'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Eyebrow})`, backgroundSize: 'cover' }}>
                            <span>Eyebrow</span>
                        </div>
                    </label>
                    <label htmlFor="makeup">
                        <input type="radio" id="makeup" name="makeup" className={classes.Service} onChange={this.onChangeRadioServiceHandler} checked={this.state.serviceChecked === 'makeup'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Makeup})`, backgroundSize: 'cover' }}>
                            <span>MakeUp</span>
                        </div>
                    </label>
                    <label htmlFor="eyelash">
                        <input type="radio" id="eyelash" name="eyelash" className={classes.Service} onChange={this.onChangeRadioServiceHandler} checked={this.state.serviceChecked === 'eyelash'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Eyelash})`, backgroundSize: '14em' }}>
                            <span>Eyelash</span>
                        </div>
                    </label>
                </form>
                {masters}
                {orders}
                <Button btnType='Success' clicked={this.clickNextStepMasters}>{buttonNext}</Button>
                <div>{informationAboutRequestOrder}</div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        activeUser: state.activeUser
    }
}


export default connect(mapStateToProps)(MainPage);