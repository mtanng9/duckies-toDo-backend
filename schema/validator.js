const TodoSchema = require("./todoSchema");
var express = require('express');


function TodoValidator(payload) {
    var valid = TodoSchema.validate(payload)
    if (valid.error != null) {
        next(valid.error)
    }
}

module.exports = TodoValidator