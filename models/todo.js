const { DataTypes, Sequelize } = require("sequelize");
const db = require("../store/postgres");

const Todo = db.define('Todo', {
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

module.exports = Todo
