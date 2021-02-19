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

/*get request to show replies that a user has responded to*/ 
router.get('/user/:userid/replies', function(req, res) {
  //want every reply that matches userid
  //using this list we want to retrun a list of requests
  
  const relevantRequests = Reply.findAll({
    attributes: ['reqId'],
    where: {
      userId = req.params.userid
      /*-----userID reference the user who created the request---
              - we need a way to associate a user with requests that they 
                have responded to but have not created.
              - do we have a way to check which requests a user has been invited to?
              - I think it may actually make sense for userID in reply to NOT be linked to userID in user, because we are actually referencing different people.
      */
    }
  })
  
})

/*reply created when a user accepts a request*/
router.post('/user/:userid/reply/:replyid', function(req, res) {
  Reply.create(req.body).then((user) => res.json(user));
})

/*send contacts, update reply*/
router.put('/user/:userid/reply/:replyid', function(req, res) {

})


module.exports = router;
