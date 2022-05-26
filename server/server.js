const express = require('express');
const port = 4000;
const cors = require('cors')
const db = require('./db/dbConnection');
const userService = require('./Services/UserService');
const { default: mongoose } = require('mongoose');
const connectionString = 'mongodb+srv://root:root@wtd.bsahy.mongodb.net/ToDo?retryWrites=true&w=majority'

    mongoose.connect(connectionString,{ useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
        console.log("Connect Success");
    });

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
    
    app.post('/get', (req,res) => {
        const servise = new userService();
        servise.insertUser();
        res.send(req.body);
    });











