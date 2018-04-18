var express = require('express');
var router = express.Router();
var ArticleModel = require("../model/article");

var multer  = require('multer') //接受文件上传
// var upload = multer({ dest: 'uploads/' }) //确认上传的路径


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
  	console.log(file);
    cb(null, "kerwin"+file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })



/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.kerwin){
  	res.render('article' ,{isnew:true});
  }else{
  	res.redirect("/login");
  }

});


router.post("/",upload.array("photoarr"),(req,res)=>{
	//console.log(req.files);//multer 提供的req.file属性
  //console.log(req.body);
	var newfiles  =req.files.map(item=>
			`/uploads/${item.filename}`
		)


	ArticleModel.create({
		title:req.body.title,
		content:req.body.content,
		createDate:new Date(),
		picpath:req.file?`/uploads/${req.file.filename}`:"",
		picpaths:req.files? newfiles :[],
		author:req.session.kerwin.username
	},function(err,data){
		if(!err){
			res.redirect("/");
		}
	})
	// req.body
})





//配置删除路由
router.get("/delete/:id",function(req,res){



	ArticleModel.findByIdAndRemove(req.params.id,function(err,data){
		if(!err){
			res.redirect("/");
		}
	})
})


router.get("/delete",function(req,res){

	// console.log(req.query.id);

	ArticleModel.findByIdAndRemove(req.query.id,function(err,data){
		if(!err){
			res.json({deleteok:1})
		}
	})
})

router.get("/update/:id",function(req,res){

	ArticleModel.findById(req.params.id,function(err,data){
		if(!err){
			res.render("article",{info:data,isnew:false});
		}
	})

})


router.post("/update/:id",upload.array("photoarr"),(req,res)=>{
  //console.log("/update/:id");
	//console.log(req.body,req.params);
	 ArticleModel.update({_id:req.params.id},{$set:{title:req.body.title,content:req.body.content}},function(err,data){
	 	if(!err){
	 		res.redirect("/");
	 	}
	 })
})

module.exports = router;
