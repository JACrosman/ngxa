var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var projects = [
    { id: '1', name: 'Test 1' },
    { id: '2', name: 'Test 2' },
];

router.get('/', function (req, res) {
    return res.send(projects);
});

module.exports = router;