var express = require('express');
const router = express.Router();
const path = require('path');

 router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

router.get('/fun', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/dist/fun.html'));
}); 
router.get('/work', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/dist/work.html'));
}); 

router.get('*', function(req, res, next){
  res.status(404);
  res.sendFile(path.join(__dirname + '/dist/notfound.html'));
});

module.exports = router;