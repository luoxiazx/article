//动态获取数据， 动态页面创建。

function Home(){

	this.init();


	this.base64Img  = `http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png`;
}

Home.prototype.init = function(){


	// 请求数据 ，创建 list , 和 分页
	this.getData(0,true);
}


Home.prototype.getData = function(offset,isFirst){

	$("#list").empty(); //请空 某个节点内的数据
	$.ajax({
		url:"/bloglist",
		data:{limit:3,offset:offset},
		success:(result)=>{
			//console.log(result);
			//动态生成列表;
			this.renderList(result.list);
			//生成分页
			if(isFirst){
				this.renderPagination(result.length);
			}

		}
	})

}

Home.prototype.renderList = function(list){

	for(var i in list){

		var $div = $("<div class='media'>").html(`
            <div class="media-left">
              <a href="#">
                <img class="media-object" src="${list[i].picpaths.length?'http://localhost:3000'+list[i].picpaths[0]:this.base64Img}" alt="...">
              </a>
            </div>
            <div class="media-body">
              <h4 class="media-heading">${list[i].title}</h4>
              ...
            </div>
          `)


		// $div.myid = list[i]._id;
		$div.get(0).myid = list[i]._id;
		//console.log($div);
		$div.click(function(){
		//console.log(this.myid);
			localStorage.setItem("id",this.myid);
			location.href="/detail?id="+this.myid;
		})

		$("#list").append($div);
	}


}

Home.prototype.renderPagination = function(length){
	//生成分页

	for(var i=0;i<length;i+=3){

		//console.log(i/3+1);


		var $li = $("<li>").html(`
			<a href="#">${i/3+1}</a>
			`);

		var _this = this;
		$li.click(function(){
			console.log($(this).index());

			_this.getData(3*$(this).index(),false);
		})

		$(".pagination").append($li);

	}
}

// Home.prototype.

new Home();
