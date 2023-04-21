const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Donovan1663!',
    database: 'hippofarms'
});

const HTTP_PORT = 8000;

var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

app.get("/sessions/:sessionid", (req, res, next) => {
    let strSessionID = req.params.sessionid;
    try {
        pool.query('SELECT * FROM tblSessions WHERE SessionID = ?', [strSessionID], function (error, result) {
            if (!error) {
                res.status(200).send(result);
            } else {
                res.status(400).send(JSON.stringify({ 'Error': error }));
            }
        })
    } catch {
        console.log(error);
    }

})

app.post("/login", (req, res, next) => {

    let strSessionID = uuidv4();
    let strEmail = req.query.email || req.body.email;
    let strPassword = req.query.password || req.body.password;

    pool.query('SELECT Password, SessionID FROM tblUsers WHERE Email = ?', [strEmail], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const hashedPassword = result[0].Password;
        const sessionID = result[0].SessionID;

        bcrypt.compare(strPassword, hashedPassword, function (error, match) {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }

            if (!match) {
                return res.status(401).send('Invalid email or password');
            }

            res.json({ sessionID });
        });
    });
});

app.post("/signup", async (req, res, next) => {

    let strFirstName = req.query.firstName || req.body.firstName;
    let strLastName = req.query.lastName || req.body.lastName;
    let strEmail = req.query.email || req.body.email;
    let strPassword = req.query.password || req.body.password;
    let strPhoneNumber = req.query.phoneNumber || req.body.phoneNumber;
    let strFarmID = req.query.farmID || req.body.farmID;

    // Hash the password before storing it in the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(strPassword, saltRounds);

    // Generate a unique session ID for the new user
    const sessionID = uuidv4();

    // Insert the new user into the database
    pool.query('INSERT INTO tblUsers (FirstName, LastName, Email, Password, MobileNumber) VALUES (?, ?, ?, ?, ? )', [strFirstName, strLastName, strEmail, hashedPassword,strPhoneNumber], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        res.json({ sessionID });
    });
});