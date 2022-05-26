const { MongoClient } = require('mongodb');




async function dbConnect(){
        const client = new MongoClient(connectionString);
        await client.connect();
        console.log("Connect to database success!)")
        client.db('ToDo'); 
         
}

module.exports.dbConnect  = dbConnect;
