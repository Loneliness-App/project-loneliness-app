var express = require('express');
var router = express.Router();
const { User, Request, Reply, Suggestion } = require('../database');


router.post('/user', function (req, res) {
    User.create(req.body).then((user) => { res.json(user); console.log("user post") })
})

router.get('/user/:id/requests', (req, res) => {
    Request.findAll({
        where: { "$User.id$": req.params.id },
        include: { model: User, attributes: [] },
        attributes: ["id", "name"],
    }).then(requests => res.json({
        requests: requests.map(r => r.get())
    }));
});

router.get('/user/:id/request/:requestId/replies', (req, res) => {
    Reply.findAll({
        where: { "$Request.id$": req.params.requestId },
        include: [
            { model: Suggestion, attributes: ["data"], required: true },
            { model: User, attributes: ["name"] },
            { model: Request, attributes: [] }
        ],
        attributes: []
    }).then(rs => {
        let replies = rs.map(r => ({
            suggestions: r.Suggestions.map(s => s.get()),
            from: r.User.name,
        }));
        res.json({replies: replies});
    });
});

/*get request to show replies that a user has responded to*/
router.get('/user/:userid/replies', function (req, res) {
    Reply.findAll({
      where: { "$User.id$": req.params.id },
      include: [
        { model: User, attributes: [] },
        { model: Request, attributes: ["id", "name"]}],
      attributes: [],
  }).then(requests => res.json({
      requests: requests.map(r => r.get())
  }));
})

/*reply created when a user accepts a request*/
router.post('/user/:userid/reply/:replyid', function (req, res) {
    Reply.create(req.body).then((user) => res.json(user));
})

/*send contacts, update reply*/
router.put('/user/:userid/reply/:replyid', function (req, res) {

})


module.exports = router;
