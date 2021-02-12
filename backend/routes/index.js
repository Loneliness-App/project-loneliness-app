var express = require('express');
var router = express.Router();
const {User, Request, Reply, Suggestion} = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user', function(req, res) {  
  User.create(req.body).then((user) => {res.json(user); console.log("user post")})
})



module.exports = router;
