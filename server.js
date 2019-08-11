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
    register_user(req, res)
});

async function register_user(req, res) {
    try {
        const [result, fields] = await conn.execute("SELECT * FROM user WHERE name= ?", [req.body.username])
        if (result.length === 0) {
            const saltRounds = 10;
            hash = bcrypt.hashSync(req.body.password, saltRounds)

            const [result2, field2] = await conn.execute("INSERT INTO user (name, password_hash) values (?, ?)", [req.body.username, hash])
            return res.send({"response": "Successfully registered user '" + req.body.username + "."})
        }
        else {
            return res.status(401).send({"response": "Failed to register user '" + req.body.username + "."})
        }
    }

    catch(err) {
        throw err
    }
}

app.post('/login', function (req, res) {
    const valid_req = valid_login_register_request(req)
    if (valid_req !== true) {
        return res.send(valid_req)
    }

    get_user(req.body.username, req.body.password, req, res)
});

async function get_user(username, password, req, res) {
    try {
        const [result, fields] = await conn.execute("SELECT * FROM `user` WHERE `name` = ?", [username])

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

app.get('/users/:id', function (req, res) {
    get_username(req, res)
});


async function get_username(req, res) {
    try {
        const [result, fields] = await conn.execute("SELECT * FROM user WHERE user_id = ?", [req.params.id])
        if (result.length !== 0) {
            return res.send({"name" : result[0].name})
        }
        return res.status(404).send({"response" : "not found"})
    }

    catch(err) {
        throw err
    }
}
/*
=============================================
=============================================
                T H R E A D S
=============================================
=============================================
*/




/*
============================
           GET ALL
============================
*/
app.get('/threads', function (req, res) {
    get_threads(req, res)
});

async function get_threads(req, res) {
    try {
        const thread_list = []
        const [result, fields] = await conn.query("SELECT * FROM thread;")

        if (result.length !== 0) {
            for (let i  = 0; i < result.length; i++) {
                thread = {
                    thread_id : result[i].thread_id,
                    thread_title : result[i].thread_title,
                    date_created : result[i].date_created,
                    user_id : result[i].user_id
                }

                thread_list.push(thread)
            }
        }
        return res.send({"threads" : thread_list})
    }

    catch(err) {
        throw err
    }
}

app.get('/threads/:id', function (req, res) {
    // console.log("getting posts in thread " + req.params.id)
    get_posts_in_thread(req.params.id, req, res)
});

async function get_posts_in_thread(id, req, res) {
    try {
        const posts_list = []
        const [result, fields] = await conn.execute("SELECT * FROM post WHERE thread_id = ?", [id])

        if (result.length !== 0) {
            for (let i  = 0; i < result.length; i++) {
                post = {
                    post_id : result[i].post_id,
                    user_id : result[i].user_id,
                    post_body : result[i].post_body,
                    date_created : result[i].date_created
                }

                posts_list.push(post)
            }
        }
        return res.send({"posts" : posts_list})
    }

    catch(err) {
        throw err
    }
}

/*
============================
           CREATE
============================
*/
app.post('/threads', function (req, res) {
    create_thread(req, res)
});

async function create_thread(req, res) {
    try {
        if (req.session.key) {
            const [result, fields] = await conn.execute("SELECT * FROM user WHERE name = ?", [req.session.key])
            if (result.length !== 0) {
                const user_id = result[0].user_id
                console.log(req.body.thread_title)
                console.log(user_id)
                const query = "INSERT INTO thread (thread_title, user_id) values (?, ?)"

                const [result2, fields2] = await conn.execute(query, [req.body.thread_title, user_id])
                return res.send({"result" : "success"})
            }
        }
        else {
            return res.status(401).send({"response" : "Unauthorized"})
        }
    }

    catch(err) {
        throw err
    }
}


/*
=============================================
=============================================
                P O S T S
=============================================
=============================================
*/

// app.get('/posts', function (req, res) {
//     get_posts(req, res)
// });


// /*
// ============================
//            GET ALL
// ============================
// */
// async function get_posts(req, res) {
//     try {
//         const thread_list = []
//         // if (req.body.)
//         const [result, fields] = await conn.query("SELECT * FROM post;")

//         if (result.length !== 0) {
//             for (let i  = 0; i < result.length; i++) {
//                 thread = {
//                     thread_id : result[i].thread_id,
//                     thread_title : result[i].thread_title,
//                     date_created : result[i].date_created,
//                     user_id : result[i].user_id
//                 }

//                 thread_list.push(thread)
//             }
//         }
//         return res.send({"posts" : thread_list})
//     }

//     catch(err) {
//         throw err
//     }
// }

/*
============================
           CREATE
============================
*/
app.post('/posts', function (req, res) {
    create_post(req, res)
});

async function create_post(req, res) {
    try {
        if (req.session.key) {
            const [result, fields] = await conn.execute("SELECT * FROM `user` WHERE `name` = ?", [req.session.key])
            if (result.length !== 0) {
                const user_id = result[0].user_id
                const query = "INSERT INTO post (post_body, thread_id, user_id) values (?, ?, ?)"
                const [result2, fields2] = await conn.execute(query, [req.body.post_body, req.body.thread_id, user_id])
                return res.send({"result" : "success"})
            }
        }
        else {
            return res.status(401).send({"response" : "Unauthorized"})
        }
    }

    catch(err) {
        throw err
    }
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);


