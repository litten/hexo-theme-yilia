import addClass from 'dom101/add-class'
import removeClass from 'dom101/remove-class'
import Util from './util'

var _isShow = false;
var $menu, $tag, $aboutme, $friends;
var hasInnerArchive
var ctn,radio,scaleW,idx,basicwrap;

//第一步 -- 初始化
var reset = function() {
	//设定窗口比率
	radio = document.body.scrollHeight/document.body.scrollWidth;
	//设定一页的宽度
	scaleW = document.body.scrollWidth;
	//设定初始的索引值
	idx = 0;
};
//第一步 -- 组合
var combine = function(){
	if($tag){
		document.getElementById("js-mobile-tagcloud").innerHTML = $tag.innerHTML;
	}
	if($aboutme){
		document.getElementById("js-mobile-aboutme").innerHTML = Util.decode($aboutme.innerHTML);
	}
	if($friends){
		document.getElementById("js-mobile-friends").innerHTML = $friends.innerHTML;
	}
	document.getElementById("js-mobile-menu").innerHTML = $menu.innerHTML;
}
//第三步 -- 根据数据渲染DOM
var renderDOM = function(){
	//生成节点
	var $viewer = document.createElement("div");
	$viewer.id = "viewer";
	$viewer.className = "hide";
	$menu = document.getElementsByClassName("header-menu")[1];
	$tag = document.getElementById("js-tagcloud");
	$aboutme = document.getElementById("js-aboutme");
	$friends = document.getElementById("js-friends");

	var menuStr = '<span class="viewer-title">菜单</span><div class="viewer-div menu" id="js-mobile-menu"></div>'
	var tagStr = $tag?'<span class="viewer-title">标签</span><div class="viewer-div tagcloud" id="js-mobile-tagcloud"></div>':"";
	var friendsStr = $friends?'<span class="viewer-title">友情链接</span><div class="viewer-div friends" id="js-mobile-friends"></div>':"";
	var aboutmeStr = $aboutme?'<span class="viewer-title">关于我</span><div class="viewer-div aboutme" id="js-mobile-aboutme"></div>':"";

	$viewer.innerHTML = '<div id="viewer-box">\
	<div class="viewer-box-l">\
		<div class="viewer-box-wrap">'+menuStr+aboutmeStr+friendsStr+tagStr+'</div>\
	</div>\
	<div class="viewer-box-r"></div>\
	</div>';

	//主要图片节点
	document.getElementsByTagName("body")[0].appendChild($viewer);
	var wrap = document.getElementById("viewer-box");
	basicwrap = wrap;
	wrap.style.height = document.body.scrollHeight + 'px';
};

var show = function(target, idx){
	document.getElementById("viewer").className = "";
	setTimeout(function(){
		basicwrap.className = "anm-swipe";
	},0);
	_isShow = true;
	document.ontouchstart=function(e){
		if(e.target.tagName != "A"){
			return false;
		}
	}
}

var hide = function(){
	document.getElementById("viewer-box").className = "";
	_isShow = false;
	document.ontouchstart=function(){
		return true;
	}
}

//第四步 -- 绑定 DOM 事件
var bindDOM = function(){
    var scaleW = scaleW;
     
    //滑动隐藏
    document.getElementById("viewer-box").addEventListener("webkitTransitionEnd", function(){

        if(_isShow == false){
            document.getElementById("viewer").className = "hide";
            _isShow = true;
        }else{
        }
         
    }, false);

    //点击展示和隐藏
    ctn.addEventListener("click", function(){
    	show();
    }, false);

    var $right = document.getElementsByClassName("viewer-box-r")[0];
    var touchStartTime;
    var touchEndTime;
    $right.addEventListener("touchstart", function(){
        touchStartTime = + new Date();
    }, false);
    $right.addEventListener("touchend", function(){
        touchEndTime = + new Date();
        if(touchEndTime - touchStartTime < 300){
            hide();
        }
        touchStartTime = 0;
        touchEndTime = 0;
    }, false);

    //滚动样式
    var $overlay = document.querySelector('#mobile-nav .overlay');
    var $header = document.querySelector('.js-mobile-header');
    var $ctn = document.querySelector('#container');
    $ctn.onscroll = function(){
        var scrollTop = $ctn.scrollTop;
        if(scrollTop >= 69){
        	addClass($overlay, 'fixed')
        }else{
        	removeClass($overlay, 'fixed')
        }
        if(scrollTop >= 160){
        	removeClass($header, 'hide')
        	addClass($header, 'fixed')
        }else{
        	addClass($header, 'hide')
        	removeClass($header, 'fixed')
        }
    };
    $header.addEventListener("touchstart", function(){
    	$ctn.scrollTop = 0
    }, false);
};

module.exports = {
	init: function(){
		//构造函数需要的参数
		ctn = document.getElementsByClassName("slider-trigger")[0];
		//构造四步
		reset();
		renderDOM();
		combine();
		bindDOM();
	}
}