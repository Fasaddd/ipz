const express = require('express');
const port = process.env.PORT || 5000;

const { Pool, Client } = require("pg");
const connectionString =
    "postgressql://postgres:yura1758@localhost:1758/beauty-app";

const client = new Client({
    connectionString: connectionString
});

const app = express();

// PostgresSQL
client.connect();

const jsonParser = express.json();

// REGISTER
app.post("/register", jsonParser, function (request, response) {
    const data = { email: request.body.email, password: request.body.password };
    console.log(data);
    let result = false;
    client.query("SELECT * from users", async (err, res) => {

        console.log(res.rows);
        if (err) {
            console.log(err);
            response.status(400).json(err);
        } else {
            res.rows.forEach(el => {
                if (el.login == data.email) {
                    response.status(200).json({ result: "Login exist!" });
                    result = true;
                    return;
                }
            });
            if (!result) {
                console.log(request.body.password, request.body.password)
                client.query(
                    'INSERT INTO users(login, password) VALUES ($1, $2)', [data.email, data.password],
                    (err, res) => {
                        console.log(res);
                        response.json({ result: "INSERT" });
                        return;
                    }
                );
            }
        }
    });
});


// LOGIN
app.post("/login", jsonParser, function (request, response) {
    const data = { email: request.body.email, password: request.body.password };
    let exist = false;
    client.query("SELECT * from users", (err, res) => {
        console.log(res.rows);
        if (err) {
            return response.json(err);
        } else {
            res.rows.forEach(el => {
                if (el.login === data.email && el.password === data.password) {
                    response.json({ res: "Logged" });
                    exist = true;
                }
            })
            if (!exist) {
                response.json({ res: "Account is not exist or incorrect" });
            }
        }
    })
});

// ORDER THE SEANS
app.post("/order", jsonParser, async function (request, response) {
    let data = {
        service: request.body.service,
        login: request.body.login,
        masterid: request.body.masterid,
        hour: request.body.hour,
        date: request.body.date
    };
    let result = {};
    let checkExisting = false;
    try {
        let res = await client.query("SELECT * from orders");
        console.log(request.body);
        console.log(res.rows);
        res.rows.forEach(el => {
            if (el.service == data.service && el.masterid == data.masterid) {
                console.log(el.date, data.date, el.hour, data.hour);
                if (el.date == data.date && el.hour == data.hour) {
                    if (el.hour == data.hour) {
                        result = { res: "Sorry but this time is busy:( Choose another time for this date!" };
                        checkExisting = true;
                    }
                }
            }
        });
        if (!checkExisting) {
            client.query('INSERT INTO orders (service, login, masterId, hour, date) VALUES ($1, $2, $3, $4, $5)', [data.service, data.login, data.masterid, data.hour, data.date]);
            result = { res: "Success! Your seans was added! Check your orders" };
        }
    } catch (err) {
        result = { res: err.stack };
    }
    console.log(result);
    response.send(result);
});

// USERS ORDERS
app.post("/userorder", jsonParser, async function (request, response) {
    let data = { login: request.body.login };
    let result = [];
    try {
        let res = await client.query("SELECT * from orders WHERE login=$1", [data.login]);
        result = [...res.rows];
    } catch (err) {
        result = { res: err.stack };
    }
    response.send(result);
});


app.listen(port, () => console.log(`Listening on port ${port}`));