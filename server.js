var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/dist/WOR'));
app.use("*", function (req, resp) {
    resp.sendFile(__dirname + '/dist/WOR/index.html');
});

var listener = server.listen(process.env.PORT || 5000, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 5000
});