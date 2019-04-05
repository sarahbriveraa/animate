var express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res, next) {
    //res.send('testing');
    res.render('index', {title: 'cool huh!', condition:false});
});
router.get('/fun', function (req, res, next) {
    //res.render(path.join(__dirname + '/docs/dist/pages/fun.html'));
});
router.get('/work', function (req, res, next) {
    //res.render(path.join(__dirname + '/docs/dist/pages/work.html'));
});
module.exports = router;