require('dotenv').config()


var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://kay:UniNinja@mycluster0-shard-00-00.mongodb.net:27017,mycluster0-shard-00-01.mongodb.net:27017,mycluster0-shard-00-02.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
  console.log('Connection to DB has been made!');
  //db.close(); // remove this and it works
});

const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()

const schema = require('./graphql/schema/Schema')

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// Respond with a simple 'coming soon' message for GET requests to the root page.
app.get('/', function (req, res) {
  res.send("The UniNinja API is coming soon!");
});

// For GET requests to the `/unis` page, an array (JSON) of all unis will be returned.
app.get('/unis', function (req, res) {
    const sussexUni = {
        name: "University of Sussex",
        id: "1"
    }

    const brightonUni = {
        name: "University of Brighton",
        id: "2"
    }

    res.send({ unis: [sussexUni, brightonUni] });
});

// run server on port 3000
app.listen('3000', _ => console.log('Server is listening on port 3000...'))
