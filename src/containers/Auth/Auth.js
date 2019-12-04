import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button.js";
import classes from "./Auth.module.css";
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionTypes from "../../store/actions";
import Aux from "../../hoc/Auxillilary";

class Auth extends Component {
  state = {
    info: {
      email: '',
      password: ''
    },
    LogIn: true,
    errorPass: null,
    errorEmail: null,
    emailValid: false,
    passValid: false,
    errorUserInfo: null,
    loading: false
  };

  onClickSubmitForm = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    let LoginMode = this.state.LogIn;
    let loginUser = { ...this.state.info };
    let activeUser = loginUser.email;
    if (LoginMode === true) {
      let userInfo = { ...this.state.info };
      let data = JSON.stringify(userInfo);
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      }).then(response => {
        response.json().then(body => {
          console.log(body);
          if (body.res === "Logged") {
            this.props.onSubmitForm(activeUser);
            this.props.history.push("/main");
          } else {
            this.setState({ errorUserInfo: body.res, loading: false });
          }
        });
      });
    } else {
      let userInfo = { ...this.state.info };
      let data = JSON.stringify(userInfo);
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      }).then(response => {
        response.json().then(body => {
          if (body.result === "INSERT") {
            this.props.onSubmitForm(activeUser);
            this.props.history.push("/main");
          } else {
            this.setState({ errorUserInfo: body.result, loading: false });
          }
        });
      });
    }
    this.setState({
      info: {
        email: '',
        password: ''
      }
    })
  };

  onHandleInputChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.checkValidation(name, value);
    let resInfo = {
      ...this.state.info,
      [name]: value
    };
    this.setState({
      info: resInfo
    });
  };

  checkValidation = (name, value) => {
    switch (name) {
      case "email":
        let emailValid = value.match(/\w+@\w+\.\w+/);
        emailValid
          ? this.setState({ errorEmail: null, emailValid: true })
          : this.setState({
            errorEmail: "Invalid enter email",
            emailValid: false
          });
        break;
      case "password":
        let passValid = value.length >= 6;
        passValid
          ? this.setState({ errorPass: null, passValid: true })
          : this.setState({
            errorPass: "Password is to short",
            passValid: false
          });
        break;
      default:
        break;
    }
  };

  onClickChangeSign = () => {
    this.setState({ LogIn: !this.state.LogIn });
  };

  render() {
    let disabledButt = true;
    if (this.state.passValid === true && this.state.emailValid === true) {
      disabledButt = false;
    }
    let error = null;
    if (this.state.errorEmail != null || this.state.errorPass != null) {
      error = (
        <Aux>
          <p style={{ color: "red", fontSize: "25px" }}>
            {this.state.errorEmail}
          </p>
          <p style={{ color: "red", fontSize: "25px" }}>
            {this.state.errorPass}
          </p>
        </Aux>
      );
    }
    let resulting = (
      <div className={classes.Auth}>
        <div style={{ color: "red", fontSize: "20px" }}>
          {this.state.errorUserInfo}
        </div>
        {this.state.LogIn ? "LogIn" : "SignIN"}
        <form>
          <input
            type="email"
            name="email"
            value={this.state.info.email}
            onChange={this.onHandleInputChange}
            placeholder="test@test.com"
          />
          <input
            type="password"
            name="password"
            value={this.state.info.password}
            onChange={this.onHandleInputChange}
            placeholder="1234567"
          />
          {error}
          <Button
            disabled={disabledButt}
            clicked={this.onClickSubmitForm}
            btnType="Success"
          >
            Submit
        </Button>
        </form>
        <Button btnType="Danger" clicked={this.onClickChangeSign}>
          SWITCH TO {this.state.LogIn ? "SignIn" : "LogIn"}
        </Button>
      </div>
    )
    if (this.state.loading) {
      resulting = <Spinner />
    }
    return (
      <Aux>{resulting}</Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: user =>
      dispatch({ type: actionTypes.AUTHENTICATED_STATUS, activeUser: user })
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Auth));
