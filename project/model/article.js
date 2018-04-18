var mongoose =require("mongoose");

var Schema = mongoose.Schema;

var obj = {
	title:String,
	content:String,
	createDate:Date,
	author:String,
	picpath:String,
	picpaths:Array
}

var model = mongoose.model("article",new Schema(obj));
//articles 集合 对应model 

module.exports = model;