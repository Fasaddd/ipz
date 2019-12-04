import React from 'react';

import classes from './Post.module.css';


const post = (props) => {

    const orderOutput = props.orderData;

    return(
        <div className={classes.Order}>
            <p><span>Login</span>: {orderOutput.login}</p>
            <p><span>Service</span>: {orderOutput.service}</p>
            <p><span>Seans date: </span> {orderOutput.date} at {orderOutput.hour} o'clock</p>
            <p><span>Master #</span>{orderOutput.masterid}</p>
        </div>
    );
};

export default post;

