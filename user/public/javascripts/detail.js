// console.log("detail");


function Detail(){

	this.init();
}

Detail.prototype.init = function(){

	this.getData();
}


Detail.prototype.getData = function(){


	$.ajax({
		url:"/detailApi",

		data:{id:localStorage.getItem("id")},
		success:(result)=>{
			console.log(result);
			$(".text-center").html(result.title);
			$(".text-left").html(result.content);
			$(".text-justify").html("作者："+result.author);
			$(".text-nowrap").html(result.createDate);
			if (result.picpath) {
				$(".img").html("<img src='http://localhost:3000"+result.picpath+"'>");
			}
			if (result.picpaths) {
				var str="";
				for (var i = 0; i < result.picpaths.length; i++) {
					str+="<img src='http://localhost:3000"+result.picpaths[i]+"'>"
				}
				//console.log(str);
				$(".img").html(str);
			}
		}
	})
}


new Detail();
