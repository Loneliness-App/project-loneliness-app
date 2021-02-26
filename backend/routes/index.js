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

router.get('/user/:userid/replies', function (req, res) {
    Reply.findAll({
      where: { "$User.id$": req.params.userid },
      include: [
        { model: User, attributes: [] },
        { model: Request, attributes: ["id", "name"]}],
      attributes: [],
  }).then(replies => res.json({
    replies: replies.map(r => r.get())
}));
})

router.post('/user/:userid/reply/:replyid', function (req, res) {
    Reply.create(req.body).then((user) => res.json(user));
})

router.put('/user/:userid/reply/:replyid', function (req, res) {
    
})


module.exports = router;
