import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import classes from './Toolbar.module.css';
import Button from '../UI/Button/Button';

import * as actionTypes from '../../store/actions';

class Toolbar extends Component {

    componentDidMount() {
        if(!this.props.isAuth){
            this.props.history.push('/');
        }
    }


    onLogOutClickHandler = () => {
        this.props.onLogOutUser();
        this.props.history.push('/');
    };


    render() {
        let logDiv = null;
        if (this.props.isAuth) {
            logDiv = (
                <div className={classes.Navigation}>
                    <ul className={classes.Navigate}>
                        <li className={classes.NavigationItem}><NavLink activeClassName={classes.active} to="/main" exact>Main</NavLink></li>
                        <li className={classes.NavigationItem}><NavLink activeClassName={classes.active} to="/orders">Seanses</NavLink></li>
                    </ul>
                    <div className={classes.LogOut}>
                        <div style={{ 'padding': '3px', 'textDecoration': 'underline' }}>
                            <p>Logged as <strong>{this.props.activeUser}</strong></p>
                        </div>
                        <Button
                            btnType='Danger'
                            clicked={this.onLogOutClickHandler}>LogOut</Button>
                    </div>
                </div>
            );
        };
        return (
            <header className={classes.Toolbar}>
                <div><b style={{ 'fontSize': '22px' }}>Lapulia App</b></div>
                {logDiv}
            </header>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuth: state.isAuthenticated,
        activeUser: state.activeUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogOutUser: () => dispatch({ type: actionTypes.USER_LOGOUT })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));