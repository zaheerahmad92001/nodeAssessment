const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://zaheer_assessment:zaheer@cluster0.jg4hi.mongodb.net';
const dbName = 'assessment';
const client = new MongoClient(url, { useUnifiedTopology: true });

function getDatabase() {
    return client.db(dbName);
  }

  module.exports ={
    getDatabase
  }