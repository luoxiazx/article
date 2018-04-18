var express = require('express');
var router = express.Router();
var ArticleModel  =require("../model/article");
/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.kerwin){

  	ArticleModel.find({
  		author:req.session.kerwin.username
  	},function(err,data){
  		if(!err){
  			// console.log(data);
  			res.render('index', { currentUser:req.session.kerwin.username,info:data });
  		}
  	})
  	
  }else{
  	res.redirect("/login");
  }	
  
});

router.get("/logout",function(req,res){

	req.session.destroy(function(error,data){
		if(!error){
			res.redirect("/login");
		}
	})

})



module.exports = router;
