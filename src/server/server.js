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
app.post("/register", jsonParser, function(request, response) {
    const data = { email: request.body.email, password: request.body.password };
    console.log(data);
    let result = false;
    client.query("SELECT * from users", async(err, res) => {
       
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
app.post("/login", jsonParser, function(request, response) {
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

app.listen(port, () => console.log(`Listening on port ${port}`));