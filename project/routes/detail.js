var express = require('express');
var router = express.Router();
var ArticleModel = require("../model/article");
/* GET home page. */

//动态路由  /detail/anyone
router.get('/:kerwinid', function(req, res, next) {

  if(req.session.kerwin){
  	//console.log(req.params.kerwinid) ;// 获取动态路由参数
  	ArticleModel.findById(req.params.kerwinid,function(err,data){
  		if(!err){
  			console.log(data); //data 是对象
  			res.render('detail',{info:data});
  		}
  	})

  }else{
  	res.redirect("/login");
  }

});



module.exports = router;
