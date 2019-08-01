const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const uuid = require("uuid/v4")
const bcrypt = require("bcrypt")
var mysql = require('mysql');

const app = express();
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

const LEGAL_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXZY0123456789!@#$%^&"

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "bort"
});

db.connect( err => {
    if (err) {
        throw err
    }
    console.log("connected to db")
})

/**
==========================================
             LOGIN/REGISTRATION
==========================================
*/

app.post('/register', function (req, res) {
    const valid_req = valid_login_register_request(req)
    if (valid_req !== true) {
        return res.send(valid_req)
    }

    db.query("SELECT * FROM user WHERE name='" + req.body.username + "';", (err, result) => {
        if (err) {
            throw_err
        }

        if (result.length === 0) {
            const saltRounds = 10;
            hash = bcrypt.hashSync(req.body.password, saltRounds)

            db.query("INSERT INTO user (name, password_hash) values ('" + req.body.username + "', '" + hash + "');", (err2, result2) => {
                if (err2) {
                    return res.send({"response": "Failed to register user '" + req.body.username + "."})
                }

                return res.send({"response": "Successfully registered user '" + req.body.username + "' (" + hash + ")."})
            })
        } else {
            return res.send({"response": "Failed to register user '" + req.body.username + "."})
        }
    })
});

app.post('/login', function (req, res) {
    const valid_req = valid_login_register_request(req)
    if (valid_req !== true) {
        return res.send(valid_req)
    }

    db.query("SELECT * FROM user WHERE name='" + req.body.username + "';", (err, result) => {
        if (err) {
            throw_err
        }

        if (result.length !== 0) {
            const hash = result[0].password_hash
            const success = bcrypt.compareSync(req.body.password, hash)
            if (success) {
                 return res.send({"response": "Successfully logged in as '" + req.body.username + "."})
            }
            else {
                return res.send({"response": "Invalid username or password."})
            }
        }
        else {
            return res.send({"response": "Invalid username or password."})
        }
    })
});

function valid_login_register_request(req) {
    /*
    Ensure login/registration request is not missing fields or
    utilizing illegal characters.
    */

    if (req.body.username) {
        const illch = has_illegal_characters(req.body.username)
        if (illch !== false) {
            return illegal_character_response(illch, "username")
        }
    }
    else {
        return missing_field_response("username")
    }

    if (req.body.password) {
        const illch = has_illegal_characters(req.body.password)
        if (illch !== false) {
            return illegal_character_response(illch, "password")
        }
    }
    else {
        return missing_field_response("username")
    }
    return true
}

function illegal_character_response(ill_char, field) {
    return {"response": "Illegal character '" + ill_char + "' in " + field + "."}
}

function missing_field_response(field) {
    return {"response": "Missing " + field + "' field."}
}

function has_illegal_characters(string) {
    // does username or password contain any illegal characters?
    //if so, return first illegal character, else return false
    for (let i = 0; i < string.length; i++) {
        const upper = string[i].toUpperCase()
        if (LEGAL_CHARACTERS.indexOf(upper) < 0) {
            return string[i]
        }
    }
    return false
}
/*
=============================================
=============================================
                T H R E A D S
=============================================
=============================================
*/

/*

*/
app.get('/threads', function (req, res) {

    return res.send({"threads": []})

    // db.query("SELECT * FROM user WHERE name='" + req.body.username + "';", (err, result) => {
    //     if (err) {
    //         throw_err
    //     }

    //     if (result.length !== 0) {
    //         const hash = result[0].password_hash
    //         const success = bcrypt.compareSync(req.body.password, hash)
    //         if (success) {
    //              return res.send({"response": "Successfully logged in as '" + req.body.username + "."})
    //         }
    //         else {
    //             return res.send({"response": "Invalid username or password."})
    //         }
    //     }
    //     else {
    //         return res.send({"response": "Invalid username or password."})
    //     }
    // })
});




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);


