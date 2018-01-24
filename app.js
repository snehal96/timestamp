var moment = require('moment');
var express = require('express');
var bodyparser = require('body-parser');
var dateformat = require('dateformat');
var app = express();

app.use(bodyparser.urlencoded({ extended: false }))

app.set('view engine','ejs');
app.set('port',process.env.PORT || 3000)
app.get('/',function(req,res){
    res.render("index");
})

app.get('/:id', function(req,res){
	var id = req.params.id;
	var date = id.split('%20');
	date = date.join(" ");
	var numPattern = /^[0-9]*$/;
    if(numPattern.test(date))
    {
    	var unixnum = Number(date);
    	var dates = new Date(unixnum);
    	var unix = dateformat(dates,'longDate');
    	var ans = {
    	 "date": unix,
    	  "unix": date
    	}
    	res.render('ans',ans);
    }
    else{
    	var unix = Date.parse(date);
    	var ans = {
	    	 "date": date,
	    	  "unix": unix
    	}
    res.render('ans',ans);

    	}
});

app.listen(app.get('port'),function(err){
    if(err) console.log(err);
    else
    console.log("App is running");
});