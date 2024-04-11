require('dotenv').config()
const Todo = require("../models/todo");

const noDueDate = [
    "No Due 1",
    "No Due 2",
    "No Due 3",
]

const dueToday = [
    "Due Today 1",
    "Due Today 2",
    "Due Today 3",
]

const dueTodayDone = [
    "Due Today Done 1",
    "Due Today Done 2",
    "Due Today Done 3",
]

const dueTomorrow = [
    "Due Tomorrow 1",
    "Due Tomorrow 2",
    "Due Tomorrow 3"
]

const dueTomorrowDone = [
    "Due Tomorrow Done 1",
    "Due Tomorrow Done 2",
    "Due Tomorrow Done 3"
]

const dueYesterday = [
    "Due Yesterday 1",
    "Due Yesterday 2",
    "Due Yesterday 3"
]

const dueYesterdayDone = [
    "Due Yesterday Done 1",
    "Due Yesterday Done 2",
    "Due Yesterday Done 3"
]

async function seedTodoTable() {
    await Todo.drop()
    console.log("The table for the Todo model was just dropped");
    
    await Todo.sync()
    console.log("The table for the Todo model was just (re)created!");
    
    // today
    // no due date tasks
    // tasks that are due today
    // tasks that are due today but completed
    console.log("Starting creation of todos due today");
    noDueDate.forEach(task => {
        Todo.create({
            task: task,
        })
    });
    
    dueToday.forEach(task => {
        Todo.create({
            task: task,
            dueDate: new Date()
        })
    });
    
    dueTodayDone.forEach(task => {
        Todo.create({
            task: task,
            complete: true,
            dueDate: new Date()
        })
    });
    console.log("Finished creation of todos due today");
    
    // upcoming
    // task due tomorrow
    // task due tomorrow but completed
    console.log("Starting creation of todos upcoming");
    dueTomorrow.forEach(task => {
        Todo.create({
            task: task,
            dueDate: new Date().setDate(new Date().getDate() + 1)
        })
    });

    dueTomorrowDone.forEach(task => {
        Todo.create({
            task: task,
            complete: true,
            dueDate:new Date().setDate(new Date().getDate() + 1)
        })
    });
    console.log("Finished creation of todos upcoming");
    
    // past due
    // task due yesterday
    // task due yesterday but completed
    console.log("Starting creation of todos past due");
    dueYesterday.forEach(task => {
        Todo.create({
            task: task,
            dueDate: new Date().setDate(new Date().getDate() - 1)
        })
    });

    dueYesterdayDone.forEach(task => {
        date = new Date()
        Todo.create({
            task: task,
            complete: true,
            dueDate: date.setDate(date.getDate() - 1)
        })
    });
    console.log("Finished creation of todos past due");
}

seedTodoTable()