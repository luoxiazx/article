var express =require("express");

var router =express.Router();

var BlogModel  =require("../model/article");

router.get("/",(req,res)=>{
	console.log(req.query);
	// find({name:"kerwin"},{排除某几列},{limit:3,skip:3},callback)
	// 
	// var  obj = {};
	// BlogModel.find({},{content:0,__v:0},{limit:req.query.limit,skip:req.query.offset},function(err,data){

	// 	if(!err){
			
	// 		obj.list = data;

			

	// 	}
	// })


	// BlogModel.count(function(err,data){
	// 			if(!err){
	// 				console.log(data);

	// 				obj.length = data;

	// 				// BlogModel.remove()
	// 				res.send(obj);
	// 			}
	// 		})
	// res.send(["1111","2222","3333"]);
	//
	//count 方法 可以直接查询 集合 有多少文档
	

	//异步处理
	// （1）回调函数 嵌套
	//  (2) 回调金字塔， 回调地狱 ----> Promise
	//  Promise.all([第一个promise对象，第二个promise对象]).then(result=>{
	//  
	//  	console.log(result);
	//  })

	var promiseList  =BlogModel.find({},{content:0,__v:0},{limit:req.query.limit,skip:req.query.offset})

	var promsiecount = BlogModel.count() //promsie对象
	Promise.all([promsiecount,promiseList]).then(result=>{
		console.log(result); //result[0] 第一个promsie兑现承诺结果, result[1] 第二个promsie兑现承诺结果
	
		res.json({length:result[0],list:result[1]})
	})

})


router.get("/count",(req,res)=>{
	BlogModel.count(function(err,data){
		if(!err){
			res.send({length:data})
		}
	})
})

module.exports = router;


// https://www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=wwmt70gy6fb&latitude=36.08431&limit=24&longitude=120.37148&offset=0&terminal=web
// https://www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=wwmt70gy6fb&latitude=36.08431&limit=24&longitude=120.37148&offset=24&terminal=web