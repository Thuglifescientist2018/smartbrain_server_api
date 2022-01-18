
const express =  require('express');
const bodyParser = require('body-parser');
const bcrypt  = require('bcrypt-nodejs')

const database = {
    users: [
        {
            id: '123', 
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124', 
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}
const app = express()
app.use(function(req, res, next) {
    req.headers['content-type'] = "application/json";
    next();
});
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send(database.users)
})
app.post("/signin", (req, res) => {
    bcrypt.compare("22apples", '$2a$10$VBTSjPSUajbfvK5C.eI2iOZvCHf80ur5NONu0/CEF/s4cpm/dmnYe', function(err, res) {
        console.log('comparison1: ', res)
    });
    bcrypt.compare("22apples", '$2a$10$VBTSjPSUajbfvK5C.eI2iOZvCHf80ur5NONu0/CEF/s4cpm/dmnYe', function(err, res) {
        console.log("comparison2: ", res)
    });
    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('success');
        }else {
            res.status(400).json('error logging in')
        }
})
let id = 125;
app.post('/register', (req, res) => {
    
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
    });
        database.users.push({
            id: `${id}`, 
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        })
        res.json(database.users[database.users.length-1])
        id++;
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        console.log(user)
        if(user.id === id) { 
            found = true;
            return res.json(user)
        }
    })
    if(!found) {
        res.status(404).json("user not found")
    }
})
app.post('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        console.log(user)
        if(user.id === id) { 
            found = true;
            user.entries++;
            return res.json(user.entries)
        }
    })
    if(!found) {
        res.status(404).json("user not found")
    }
})

// bcrypt start


// // Load hash from your password DB.

// bcrypt end

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

