var express = require('express');
const Todo = require('../models/todo');
const { Op } = require('sequelize');
const TodoSchema = require('../schema/todoSchema');
const TodoValidator = require('../schema/validator');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    var todos = await Todo.findAll()
    res.json(todos)
  } catch (err) {
    res.json(next(err))
  }
});

// issue with time zone END_DAY is in tomorrow instead of right before midnight
router.get('/today', async function(req, res, next) {
  try {
    const START_DAY = new Date().setHours(0,0,0,0);
    const END_DAY = new Date().setHours(23,59,59,59)
    var todos = await Todo.findAll({
      where: {
        [Op.and]: [ 
          {[Op.or]: [
            { dueDate: {
              [Op.gt]: START_DAY,
              [Op.lt]: END_DAY
            }},
            { dueDate: null}   
          ]
        },
        {complete: false}
        ]
      }
    })
    res.json(todos)
  } catch (err) {
    res.json(next(err))
  }
});

router.get('/upcoming', async function(req, res, next) {
  try {
    const NEXT_DAY = new Date().setHours(24,0,0,0);
    var todos = await Todo.findAll({
      where: {
        [Op.and]: [
          {complete: false},
          { dueDate: {
            [Op.gt]: NEXT_DAY,
          }}
        ]
      }
    })
    res.json(todos)
  } catch (err) {
    res.json(next(err))
  }
});

router.get('/pastDue', async function(req, res, next) {
  try {
    const TODAY = new Date().setHours(0,0,0,0);
    var todos = await Todo.findAll({
      where: {
        [Op.and]: [
          {complete: false},
          {dueDate: {
            [Op.lt]: TODAY,
          }}
        ]
      }
    })
    res.json(todos)
  } catch (err) {
    res.json(next(err))
  }
});

router.get('/completed', async function(req, res, next) {
  try {
    var todo = await Todo.findAll({
      where: {
        complete: true
      }
    })
  
    res.json(todo)
  } catch (err) {
    res.json(next(err))
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    var id = req.params.id
    var todo = await Todo.findAll({
      where: {
        id: id
      }
    })
  
    res.json(todo)
  } catch (err) {
    res.json(next(err))
  }
});

router.post('/', async function(req, res, next) {
  try {
    var body = req.body
    var result = TodoSchema.validate(body)
    if (result.error != null) {
        next(result.error)
    } else {
      var todo = await Todo.create({
        // create row in db (async) -> (promise)
        // reads row back (async) <- (promise)
        // cast data to instance of model object (object, err)
        task: body.task,
        complete: body.complete,
        dueDate: body.dueDate
      })
      res.json(todo.id)
    }
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async function(req, res, next) {
  try {
    var id = req.params.id
    var body = req.body
    var result = TodoSchema.validate(body)
    if (result.error != null) {
      next(result.error)
  } else {
    var rows = await Todo.update(
      {
        task: body.task,
        complete: body.complete,
        dueDate: body.dueDate
      },
      {
        where: {
          id: id
        }
      })
  
      res.json(rows)
  }
  } catch (err) {
    res.json(next(err))
  }
})

router.delete('/:id', async function(req, res, next) {
  try {
    var id = req.params.id
    var rows = await Todo.destroy({
      where: {
        id: id
      }
    })
    res.json(rows)
  } catch (err) {
    res.json(next(err))
  }
})

module.exports = router;
