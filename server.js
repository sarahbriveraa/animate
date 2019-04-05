var express = require('express');
var hbs = require('express-handlebars');
var app = express();
const path = require('path');
const router = express.Router();
var routes = require('./docs/src/routes/index');

//View Engine
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Routes

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/docs/dist/index.html'));
});
router.get('/fun', function (req, res) {
    res.sendFile(path.join(__dirname + '/docs/dist/pages/fun.html'));
});
router.get('/work', function (req, res) {
    res.sendFile(path.join(__dirname + '/docs/dist/pages/work.html'));
});


//app.use(express.static(__dirname + '/docs/dist'));
app.use('/', routes);
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('working on ' + app.get('port'));
});