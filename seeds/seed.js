require('dotenv').config()
const Todo = require("../models/todo");

Todo.sync()
console.log("The table for the Todo model was just (re)created!");