const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
/*
app.get('/', function(req, res){
  res.sendFile("index.html", {
    root: __dirname + '/../public'
  });
});
*/

const http = require('http').createServer(app);
http.listen(3000, function(){
  console.log('listening on *:3000');
});