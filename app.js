var chalk = require('chalk');
var express=require('express');
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes=require('./routes/route.js');

var app=express();

var dbURI = 'mongodb://localhost/employeeApp';
mongoose.connect(dbURI);

app.use(express.static(__dirname + '/public'));        
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());


require('./routes/route.js')(app);

var port = process.env.PORT || 3000;

var server=app.listen(port,function(req,res){
    console.log(chalk.green("Catch the action at http://localhost:"+port));
});