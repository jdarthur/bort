const express = require('express');
const session = require('express-session')

const redis = require("redis");
const connect_redis = require('connect-redis')(session);
const redis_client  = redis.createClient();

const bodyParser = require('body-parser')
const path = require('path');
const uuid = require("uuid/v4")
const bcrypt = require("bcrypt")

const app = express();
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())
app.use(session({secret: process.env.SESSION_SECRET,
                 store: new connect_redis({ host: 'localhost',
                                    port: 6379,
                                    client: redis_client,
                                    ttl :  260}),
                 saveUninitialized : true,
                 resave: false}))

const mysql = require('mysql2/promise')
let conn = null

async function main() {

    conn = await mysql.createConnection({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'bort'
    })
    const [rows, fields] = await conn.execute('SELECT * FROM user;');
    // console.log(rows)
}
main()

/**
==========================================
==========================================
             LOGIN/REGISTRATION
==========================================
==========================================
*/
const LEGAL_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXZY0123456789!@#$%^&"

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

    get_user(req.body.username, req.body.password, req, res)

});

async function get_user(username, password, req, res) {
    try {
        const [result, fields] = await conn.query("SELECT * FROM user WHERE name='" + username + "';")

        if (result.length !== 0) {
            const hash = result[0].password_hash
            const success = await bcrypt.compare(password, hash)
            if (success) {
                // const session_id = uuid()
                req.session.key = username
                return res.send({"response": "Successfully logged in as '" + username + "'.",
                                 "session_id" : "F"})
            }

            return res.status(401).send(invalid_username_password_response())
        }

        return res.status(401).send(invalid_username_password_response())
    }

    catch(err) {
        throw err
    }
}

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

function invalid_username_password_response() {
    return {"response": "Invalid username or password."}
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
    console.log(req.session)
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


