var express =require("express");

var router =express.Router();

var BlogModel  =require("../model/article");



router.get("/",function(req,res){

	// req.query.id
	BlogModel.findById(req.query.id,function(err,data){

		if(!err){
			res.send(data);
		}
	})
})

module.exports = router;