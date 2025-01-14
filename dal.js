
require("dotenv").config();
const mongoDBPass = process.env.PASSWORD
const MongoClient = require('mongodb').MongoClient;
const url    = `mongodb+srv://ylem:${mongoDBPass}@mycluster.8hs7p.mongodb.net/?retryWrites=true&w=majority&appName=myCluster`
//const url    = 'mongodb://localhost:27017';
var db;

// connect to mongo
const mongoConnect = function(callback) {
    MongoClient.connect(
        url,
        { useUnifiedTopology: true }
        )
        .then(client => {
            db = client.db('myproject');
            callback();
        });
       /* .catch(error => {
            console.log(error);
            throw new Error('DB connection failed...');
        });8?
}



// create user account
function create(name, email, password){
    return new Promise(async(resolve, reject) => {  
        try{  
         const collection = db.collection('users');
         const doc = {name, email, password, balance: 0};
         await collection.insertOne(doc, {w:1})
         resolve(doc);
        }
        catch(err){
         reject(err);
        }    
    })
}

// find user account
function find(email){
    return new Promise(async (resolve, reject) => {   
        try {
            const customers = await db.collection('users').find({email: email}).toArray(); 
            resolve(customers);
          } catch (err) {
            reject(err);
          } 
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise(async (resolve, reject) => {    
        try {
        const customers = await db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false }
            )
            resolve(customers)           
        } catch (err) {
            reject(err);
        }

    });    
}

// all users
const all = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const customers = await db.collection('users').find({}).toArray(); 
        resolve(customers);
      } catch (err) {
        reject(err);
      }
    });
  };

module.exports = {create, findOne, find, update, all, mongoConnect};