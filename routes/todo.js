var express = require('express');
const Todo = require('../models/todo');
const { Op } = require('sequelize');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var todos = await Todo.findAll()
  res.json(todos)
});

// issue with time zone END_DAY is in tomorrow instead of right before midnight
router.get('/today', async function(req, res, next) {
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
});

router.get('/upcoming', async function(req, res, next) {
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
});

router.get('/pastDue', async function(req, res, next) {
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
});

router.get('/completed', async function(req, res, next) {
  var todo = await Todo.findAll({
    where: {
      complete: true
    }
  })

  res.json(todo)
});

router.get('/:id', async function(req, res, next) {
  var id = req.params.id
  var todo = await Todo.findAll({
    where: {
      id: id
    }
  })

  res.json(todo)
});

router.post('/', async function(req, res, next) {
  var body = req.body
  var todo = await Todo.create({
    task: body.task,
    complete: body.complete,
    dueDate: body.dueDate
  })
  res.json(todo.id)
})

router.put('/:id', async function(req, res, next) {
  var id = req.params.id
  var body = req.body
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
})

router.delete('/:id', async function(req, res, next) {
  var id = req.params.id
  var rows = await Todo.destroy({
    where: {
      id: id
    }
  })
  res.json(rows)
})

module.exports = router;
