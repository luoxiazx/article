var express = require('express');
var router = express.Router();
var UserModel = require("../model/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("login",{showErr:false} );
});

//post请求
router.post("/",function(req,res){


	// req.body 
	UserModel.find({
		email:req.body.email,
		password:req.body.password
	},function(err,data){
		if(!err){
			console.log(data);
			if(data.length==0){

				res.render("login",{showErr:true});
			}else{
				req.session.kerwin =data[0]; //开辟空间存储 信息
				res.redirect("/");//跳转到首页
			}
		}
	})
})

module.exports = router;
