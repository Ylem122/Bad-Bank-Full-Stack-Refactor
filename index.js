
const path = require('path');
var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');
//app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(express.static(path.join(__dirname, './build')));
//app.use('/', express.static('dist'))
// used to serve static files from public directory
app.use(express.json())
//app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});



// find user account
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

app.post("/account/postfindone", async (req, res) => {
      let email = req.body.email;
      dal.find(email)
        .then((user) => {
            console.log(user);
            res.send(user);
        })
        .catch(err => {res.send(err)})
})

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', async (req, res) => {
    dal.all()
    .then((docs) => {
            console.log(docs);
            res.send(docs);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
});

var port = 3000;

dal.mongoConnect(() => {
  app.listen(port);
  console.log('Running on port: ' + port);
})
