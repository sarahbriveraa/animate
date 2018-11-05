var express = require('express');
var app = express();

app.use(express.static(__dirname + '/docs/dist'));

app.listen('3006');
console.log('working on 3006');
