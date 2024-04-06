var express = require('express');
const Todo = require('../models/todo');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var todos = await Todo.findAll()
  res.json(todos)
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

router.get('/today', async function(req, res, next) {
});

router.get('/upcoming', async function(req, res, next) {
});

router.get('/pastDue', async function(req, res, next) {
});

router.get('completed', async function(req, res, next) {
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
