var express = require('express'),
    http = require('http'),
    app = express(),
    httpPort = process.env.PORT || 3000;

app.use(express.static(__dirname + '/assets', { maxAge: 86400 }));
app.use('/test', express.static(__dirname + '/test', { maxAge: 86400 }));

http.createServer(app).listen(httpPort);
