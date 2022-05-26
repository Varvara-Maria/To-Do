
const dbo = require('../db/dbConnection');
const User = require('../Models/User')

module.exports = class UserService {

    getAllUsers(){
        User.find({}, (err, res)=>{
            if(err) 
                console.log(err);
            console.log(res);
        })
    }

    insertUser(data){
        User.create({
            name : data.name,
            email : data.email,
            password : data.password,
        })
    }

    
}