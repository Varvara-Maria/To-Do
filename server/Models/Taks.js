const { ObjectId } = require("bson")

module.exports = class Task{
    constructor(task, datetime){
        this.id = ObjectId();
        this.task = task;
        this.isDone = false;
    }
}