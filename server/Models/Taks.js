const { ObjectId } = require("bson")

module.exports = class Task{
    constructor(task, datetime){
        this.id = ObjectId();
        this.task = task;
        this.datetime = datetime;
        this.isDone = false;
    }
}