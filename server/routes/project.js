var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var projects = [
    { _id: '1', name: 'Test 1' },
    { _id: '2', name: 'Test 2' },
];

router.get('/', function (req, res) {
    return res.send(projects);
});

router.get('/:id', function (req, res) {
    return res.send(projects.find(project => project._id == req.params.id));
});

router.put('/publish/:name', function(req, res) {
    return res.send({ _id: '1', name: 'Test Publish ' + req.params.name });
});

module.exports = router;