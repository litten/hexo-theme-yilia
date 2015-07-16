define([], function(){

	var Tips = (function(){

		var $tipBox = $(".tips-box");

		return {
			show: function(){
				$tipBox.removeClass("hide");
			},
			hide: function(){
				$tipBox.addClass("hide");
			},
			init: function(){
				
			}
		}
	})();

	var resetTags = function(){
		var tags = $(".tagcloud a");
		tags.css({"font-size": "12px"});
		for(var i=0,len=tags.length; i<len; i++){
			var num = tags.eq(i).html().length % 5 +1;
			tags[i].className = "";
			tags.eq(i).addClass("color"+num);
		}
	}

	var slide = function(idx){
		var $wrap = $(".switch-wrap");
		$wrap.css({
			"transform": "translate(-"+idx*100+"%, 0 )"
		});
		$(".icon-wrap").addClass("hide");
		$(".icon-wrap").eq(idx).removeClass("hide");
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
		});

		var timeout;
		var isEnterBtn = false;
		var isEnterTips = false;

		$(".icon").bind("mouseenter", function(){
			isEnterBtn = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterBtn = false;
			setTimeout(function(){
				if(!isEnterTips){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-box").bind("mouseenter", function(){
			isEnterTips = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterTips = false;
			setTimeout(function(){
				if(!isEnterBtn){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-inner li").bind("click", function(){
			var idx = $(this).index();
			slide(idx);
			Tips.hide();
		});
	}

	var Scroll2Top = function(){
	    var obtn = document.getElementById('scroll2Top-btn');
		//获取页面可视区的高度
		var timer = null;
		var isTop = true;
	    window.onscroll = function(){
	    	var osTop = document.body.scrollTop;
	    	var clientHeight = document.documentElement.clientHeight;
	    	if(osTop >= clientHeight){
	    		obtn.style.display="block";
	    	} else {
	    		obtn.style.display="none";
	    	}
	        if(!isTop){
	            clearInterval(timer);
	        }
	        isTop = false;
	    }
		obtn.onclick = function(){
			//设置定时器
			timer = setInterval(function(){
				var osTop = document.body.scrollTop;
				var ispeed = Math.floor(-osTop / 5);
				document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
				isTop = true;
				if (osTop == 0){
					clearInterval(timer);
				}
			},30);
		}
	}

	return {
		init: function(){
			resetTags();
			bind();
			Tips.init();
			Scroll2Top();
		}
	}
});