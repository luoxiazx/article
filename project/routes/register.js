var express = require('express');
var router = express.Router();
var UserModel = require("../model/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("register" );
});

//post请求
router.post("/",function(req,res){

	//console.log(req.body);
	//存数据库-

	UserModel.create({
		username:req.body.username,
		email:req.body.email,
		password:req.body.password
	},function(err,data){
		if(!err){
			res.redirect("/login"); //重定向
		}
	})

})



module.exports = router;
