import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainPage.module.scss';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxillilary';

import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';



// img
import Hair from '../../assets/hair.png';
import Nail from '../../assets/nail.png';
import Eyebrow from '../../assets/eyebrow.png';
import Makeup from '../../assets/makeup.png';
import Eyelash from '../../assets/eyelash.png';

class MainPage extends Component {

    state = {
        showMasters: false,
        showOrder: false,
        serviceChecked: '',
        startDate: new Date(),
        startTime: '10:00',
        orderDescription: ''
    };
    s
    clickNextStepMasters = () => {
        if (this.state.showMasters === false) {
            this.setState({ showMasters: true })
        } else {
            this.setState({ showOrder: true })
        };
    };

    onChangeRadioHandler = (event) => {
        this.setState({ serviceChecked: event.target.name });
    };

    onChangeHandler = (date) => {
        let formattingData = date + '';
        formattingData = formattingData.slice(0,15);
        console.log(formattingData);
        this.setState({
            startDate: date
        });
    };

    onChangeTime = (time) => {
        this.setState({
            startTime: time
        })
    };

    onChangeHandlerDescription = (event) => {
        this.setState({
            orderDescription: event.target.value
        })
    }

    render() {
        console.log(this.state.startDate);
        console.log(this.state.startTime);
        // console.log(this.state.orderDescription);
        let masters = null;
        let orders = null;
        if (this.state.showMasters === true) {
            masters = (
                <Aux>
                    <h2>Choose your master</h2>
                    <form className={classes.Services}>
                        <label htmlFor="master1">
                            <input type="radio" id="master1" name="master1" className={classes.Service} onChange={this.onChangeRadioHandler} checked={this.state.serviceChecked === 'eyelash'} />
                            <div className={classes.Box}>
                                <span>Master#1</span>
                            </div>
                        </label>
                        <label htmlFor="eyelash">
                            <input type="radio" id="eyelash" name="eyelash" className={classes.Service} onChange={this.onChangeRadioHandler} checked={this.state.serviceChecked === 'eyelash'} />
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
                            <DatePicker
                                value={this.state.startDate}
                                onChange={this.onChangeHandler}
                                // minDate={new Date()}
                            />
                            <TimePicker
                                maxTime="17:00"
                                minTime="10:00"
                                onChange={this.onChangeTime}
                                value={this.state.startTime}
                            />
                        </div>
                        <div>
                            <h3>Descript your wish and we will call you:</h3>
                            <textarea  
                                rows="10" cols="30" 
                                value={this.state.orderDescription} 
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
                        <input type="radio" id="hair" name="hair" className={classes.Service} onChange={this.onChangeRadioHandler} checked={this.state.serviceChecked === 'hair'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Hair})`, backgroundSize: 'cover' }}>
                            <span>Haircut, dyeing, hairdo</span>
                        </div>
                    </label>
                    <label htmlFor="nail">
                        <input type="radio" id="nail" name="nail" className={classes.Service} onChange={this.onChangeRadioHandler} checked={this.state.serviceChecked === 'nail'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Nail})`, backgroundSize: 'cover' }}>
                            <span>Manicure, pedicure</span>
                        </div>
                    </label>
                    <label htmlFor="eyebrow">
                        <input type="radio" id="eyebrow" name="eyebrow" className={classes.Service} onChange={this.onChangeRadioHandler} checked={this.state.serviceChecked === 'eyebrow'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Eyebrow})`, backgroundSize: 'cover' }}>
                            <span>Eyebrow</span>
                        </div>
                    </label>
                    <label htmlFor="makeup">
                        <input type="radio" id="makeup" name="makeup" className={classes.Service} onChange={this.onChangeRadioHandler} checked={this.state.serviceChecked === 'makeup'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Makeup})`, backgroundSize: 'cover' }}>
                            <span>MakeUp</span>
                        </div>
                    </label>
                    <label htmlFor="eyelash">
                        <input type="radio" id="eyelash" name="eyelash" className={classes.Service} onChange={this.onChangeRadioHandler} checked={this.state.serviceChecked === 'eyelash'} />
                        <div className={classes.Box} style={{ backgroundImage: `url(${Eyelash})`, backgroundSize: '14em' }}>
                            <span>Eyelash</span>
                        </div>
                    </label>
                </form>
                {masters}
                {orders}
                <Button btnType='Success' clicked={this.clickNextStepMasters}>Next Step</Button>
            </div>
        );
    };
};

export default MainPage