
const { model } = require('mongoose');
const dbo = require('../db/dbConnection');
const Task = require('../Models/Taks');
const { findOneAndReplace } = require('../Models/User');
const User = require('../Models/User')

module.exports = class UserService {

    getAllUsers(){
        User.find({}, (err, res)=>{
            if(err) 
                console.log(err);
            console.log(res);
        })
    }

    getUserData(userId){
        return User.findById(userId);
    }

    RegistrationUser(data){
        User.create({
            name : data.name,
            email : data.email,
            password : data.password,
            location : "",
        })
        return data;
    }

    LoginUser(data){
        console.log(data);
        return User.findOne({email : data.email, password : data.password, }, (err, res)=>{
            if(err) {
                console.log(err)
            }else{
                console.log(res)
            }
       }).clone();
    }

    async AddNewTask(id, data){
        const task = new Task(data.task)
        await this.getUserData(id).then( async (user)=>{
            user.ToDoList.push({...task});
            console.log(user.ToDoList)
            try{
                console.log(user.ToDoList)
                await User.updateOne({_id : user._id}, { ToDoList : user.ToDoList }, {upsert : true});

            }catch(e){
                console.log(e)
            }
            
        });

        return this.getUserData(id);
    }

    async DeleteTask(id, taskId){
        await this.getUserData(id).then(async (user)=>{
            let task = await user.ToDoList.find( x=>x.id == taskId);
            user.ToDoList.remove(task);
            await User.findOneAndUpdate({_id : user._id}, {ToDoList : user.ToDoList}, {upsert : true});
        })

        return this.getUserData(id);
    }

    async MarkIsDone (id,taskId){
        await this.getUserData(id).then(async(result) => {
           let task =  await result.ToDoList.find(x=>x.id == taskId);
           result.ToDoList.remove(task);
           switch(task.isDone){
               case true: {
                   task.isDone = false;
                   break;
               }
               case false : {
                    task.isDone = true;
                    break
               }
           }
           result.ToDoList.push(task);
           await User.findOneAndUpdate({_id : result._id}, {ToDoList : result.ToDoList}, {upsert : true});
        }).catch((err) => {
            console.log(err)
        });
    }

    async ChangeLocation(id, location){
        await this.getUserData(id).then(async(result) => {
            result.location = location;
            await User.findOneAndUpdate({_id : result._id}, {location : result.location}, {upsert : true});
        }).catch((err)=>{
            console.log(err);
        })
    }

    async UpdateTask(id, taskid,data){
        await this.getUserData(id).then(async (result) => {
            console.log(data)
            let list = result.ToDoList;
            console.log(list);
            let findTask = list.find(x=>x.id == taskid)
            console.log("DATA", data.task)
            findTask.task = data.task;
            console.log("DATA FIND", findTask)
            let res = list.filter(x=>x.id != taskid);
            
            res.push(findTask);
            console.log(res)
            console.log(res);
            await User.findOneAndUpdate({_id : id}, {ToDoList : res}, {upsert : true});
            
        }).catch((err)=>{
            console.log(err);
        })
    }


    
}