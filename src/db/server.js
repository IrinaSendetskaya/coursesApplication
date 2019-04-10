var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var coursesUrl = './courses.json';
var app=express();
var jsonParser=bodyParser.json();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(express.static(__dirname+"/public"),allowCrossDomain);

app.listen(3000, () => {
    console.log('Server started!')
});
 
app.get("/api/courses", function(req,res){
    
    var content=fs.readFileSync(coursesUrl,'utf8');
    var courses=JSON.parse(content);
    res.send(courses);
});

