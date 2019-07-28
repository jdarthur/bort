const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const uuid = require("uuid/v4")
const bcrypt = require("bcrypt")

const app = express();
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

const LEGAL_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXZY0123456789!@#$%^&"

app.get('/ping', function (req, res) {
 return res.send({"response": "poong"})
});

let hash = null


app.post('/register', function (req, res) {
    console.log(req.body)
    if (req.body.username) {
        const illch = has_illegal_characters(req.body.username)
        if (illch !== false) {
            return res.send({"response": "Illegal character '" + illch + "' in username."})
        }
    }
    else {
        return res.send({"response": "Missing username field"})
    }

    if (req.body.password) {
        const illch = has_illegal_characters(req.body.password)
        if (illch !== false) {
            return res.send({"response": "Illegal character '" + illch + "' in password."})
        }
    }
    else {
        return res.send({"response": "Missing password field"})
    }

    const saltRounds = 10;
    hash = bcrypt.hashSync(req.body.password, saltRounds)


    return res.send({"response": "Successfully registered user '" + req.body.username + "' (" + hash + ")."})

});

app.post('/login', function (req, res) {
    console.log(req.body)
    if (req.body.username) {
        const illch = has_illegal_characters(req.body.username)
        if (illch !== false) {
            return res.send({"response": "Illegal character '" + illch + "' in username."})
        }
    }
    else {
        return res.send({"response": "Missing username field"})
    }

    if (req.body.password) {
        const illch = has_illegal_characters(req.body.password)
        if (illch !== false) {
            return res.send({"response": "Illegal character '" + illch + "' in password."})
        }
    }
    else {
        return res.send({"response": "Missing password field"})
    }

    const success = bcrypt.compareSync(req.body.password, hash)
    if (success) {
         return res.send({"response": "Successfully logged in as '" + req.body.username + "."})
    }
    else {
        return res.send({"response": "Invalid username or password."})
    }
});




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




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);


