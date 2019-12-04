import React, { Component } from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import classes from './Orders.module.css';

class Orders extends Component {

    state = {
        loaded: false,
        orderedList: []
    }

    componentDidMount() {
        fetch("/register")
            .then(response => {
                response.json().then(body => {
                    console.log(body);
                });
            });
    };

    render() {
        let dataOrders = <Spinner />;
        let orders = { ...this.state.orderedList };
        let keys = Object.keys(orders);
        let def = Object.values(orders);



        if (this.state.loaded) {
            if (keys.length < 1) {
                dataOrders = (
                    <div>
                        <h3>You have not order!</h3>
                    </div>
                )
            } else {
                dataOrders = def.map((element, index) => {
                    element.idElement = keys[index];
                    return <Order
                        key={element.idElement}
                        date={element.date}
                        ingredients={element.ingredients}
                    />
                });
            }

        };



        return (
            <div className={classes.Orders}>
                <h2>Your Orders</h2>
                {dataOrders}
            </div>
        );
    };
};