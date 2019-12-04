import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Post from '../../components/Post/Post';
import classes from './Posts.module.css';
import Aux from '../../hoc/Auxillilary';

class Posts extends Component {

    state = {
        loaded: false,
        orderedList: []
    }

    componentDidMount() {
        let data = JSON.stringify({ login: this.props.activeUser });
        console.log(data);
        fetch("/userorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
            .then(response => {
                response.json().then(body => {
                    console.log(body);
                    this.setState({
                        orderedList: body,
                        loaded: true
                    });
                });
            });
    };

    render() {
        let dataOrders = <Spinner />;
        let orders = [...this.state.orderedList];



        if (this.state.loaded) {
            if (orders.length < 1) {
                dataOrders = (
                    <div>
                        <h3>You don't have seans!</h3>
                    </div>
                )
            } else {
                dataOrders = orders.map((element) => {
                    return <Post
                        key={element.id + element.login}
                        orderData={element} />
                });
            }

        };



        return (
            <Aux>
                <h2 style={{textAlign: 'center'}}>Your orders</h2>
                <hr/>
                <div className={classes.Posts}>
                    <div className={classes.Postes}>
                        {dataOrders}
                    </div>
                </div>
            </Aux>

        );
    };
};


const mapStateToProps = state => {
    return {
        activeUser: state.activeUser
    }
}

export default connect(mapStateToProps)(Posts);