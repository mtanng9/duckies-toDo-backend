var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Get all todos');
});

router.get('/:id', function(req, res, next) {
  res.send('Get route with id of: ' + req.params.id);
});

router.post('/', function(req, res, next) {
  res.send('You create a todo');
})

router.put('/:id', function(req, res, next) {
  res.send('You updated a todo with id of: ' + req.params.id);
})

router.delete('/:id', function(req, res, next) {
  res.send('You deleted a todo with the id of: ' + req.params.id)
})

module.exports = router;
