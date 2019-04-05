var express = require('express');
var hbs = require('express-handlebars');
var app = express();
const path = require('path');
const router = express.Router();


app.use(express.static(__dirname + '/docs/dist'));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/docs/dist/index.html'));
});

router.get('/fun', function (req, res) {
    res.sendFile(path.join(__dirname + '/docs/dist/pages/fun.html'));
});

router.get('/work', function (req, res) {
    res.sendFile(path.join(__dirname + '/docs/dist/pages/work.html'));
});

app.use('/', router);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('working on ' + app.get('port'));
});