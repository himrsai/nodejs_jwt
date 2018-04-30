var express = require('express');
var jwt = require('jsonwebtoken');

const app = express();

app.get("/",function(req,res){
	res.send("ok");
});
app.post("/api/login", function(req,res){
	const user = {id:3};
	const token = jwt.sign({user},'my_secret_token');
	res.json({token:token});
});

app.get("/api/protected",ensureToken,function(req,res){
	jwt.verify(req.token, 'my_secret_token',function(err, data){
		if(err){
			res.sendStatus(403);
		}else{
			res.json({text:"this  is protected.",
					data:data});
		}
	});
});

function  ensureToken(req,res, next){
	const userHeader = req.headers["authorization"];
	if(typeof userHeader !== "undefined"){
		const user = userHeader.split(" ");
		const userToken = user[1];
		req.token = userToken;
		next();
	}else{	
		res.sendStatus(403);
	}
}
app.listen("3000",function(){
	console.log("Server is running with 3000 port.");
});