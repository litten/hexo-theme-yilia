var Main = (function(){

	var resetTags = function(){
		var tags = $(".tagcloud a");
		tags.css({"font-size": "12px"});
		for(var i=0,len=tags.length; i<len; i++){
			var num = parseInt(Math.random()*5+1);
			tags[i].className = "";
			tags.eq(i).addClass("color"+num);
		}
	}

	var bind = function(){
		var switchBtn = $("#myonoffswitch");
		var tagcloud = $(".second-part");
		var navDiv = $(".first-part");
		switchBtn.click(function(){
			if(switchBtn.hasClass("clicked")){
				switchBtn.removeClass("clicked");
				tagcloud.removeClass("turn-left");
				navDiv.removeClass("turn-left");
			}else{
				switchBtn.addClass("clicked");
				tagcloud.addClass("turn-left");
				navDiv.addClass("turn-left");
				resetTags();
			}
		})
	}

	var fancyInit = function(){
		var isFancy = $(".isFancy");
		if(isFancy.length != 0){
			var imgArr = $(".article-inner img");
			for(var i=0,len=imgArr.length;i<len;i++){
				var src = imgArr.eq(i).attr("src");
				var title = imgArr.eq(i).attr("alt");
				imgArr.eq(i).replaceWith("<a href='"+src+"' title='"+title+"' rel='fancy-group' class='fancy-ctn fancybox'><img src='"+src+"' title='"+title+"'></a>");
			}
			$(".article-inner .fancy-ctn").fancybox();
		}
	}

	return {
		init: function(){
			resetTags();
			bind();
			fancyInit();
		}
	}
})();

$(Main.init());