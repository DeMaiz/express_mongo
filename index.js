var express = require("express");
var app = express();
var mongo = require("./db");


mongo.init(function(mongoHelper){
	global.db={
		expertize: mongoHelper
	}
})
app.use("/",function(req,res,next){
	console.log("checking authentication");
	next();
})

app.get("/mongotest",function(req,res){
	global.db.expertize.insert({name:"Shoaib Hayat"},function(document){
			res.json(document);
		});
});	

app.get("/documents",function(req,res){
		global.db.expertize.select(function(documents){
			res.json(documents);
		});
});
app.post("/",function(req,res){
	res.json({
		message:"successfully post"
	});
});
app.get("/",function(req,res){
	res.json({
		name:"Mustafa"
	});
});

app.listen(8080,function (err) {
	if(err){
		console.log(err);
		return
	}

	console.log("Server is listening on port 8080");
})