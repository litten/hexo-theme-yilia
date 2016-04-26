define([], function(){
    var _isShow = false;
    var $tag, $aboutme, $friends;

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
            document.getElementById("js-mobile-aboutme").innerHTML = $aboutme.innerHTML;
        }
        if($friends){
            document.getElementById("js-mobile-friends").innerHTML = $friends.innerHTML;
        }
    }
    //第三步 -- 根据数据渲染DOM
    var renderDOM = function(){
        //生成节点
        var $viewer = document.createElement("div");
        $viewer.id = "viewer";
        $viewer.className = "hide";
        $tag = document.getElementById("js-tagcloud");
        $aboutme = document.getElementById("js-aboutme");
        $friends = document.getElementById("js-friends");
        function menuList(name) {
            return $("link.menu-list").attr(name);
        };
        var tagStr = $tag?'<span class="viewer-title">'+ menuList("tags") + '</span><div class="viewer-div tagcloud" id="js-mobile-tagcloud"></div>':"";
        var friendsStr = $friends?'<span class="viewer-title">'+ menuList("friends") + '</span><div class="viewer-div friends" id="js-mobile-friends"></div>':"";
        var aboutmeStr = $aboutme?'<span class="viewer-title">'+ menuList("about") + '</span><div class="viewer-div aboutme" id="js-mobile-aboutme"></div>':"";

        $viewer.innerHTML = '<div id="viewer-box">\
        <div class="viewer-box-l">\
            <div class="viewer-box-wrap">'+aboutmeStr+friendsStr+tagStr+'</div>\
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
        ctn.addEventListener("touchend", function(){
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
        var $overlay = $("#mobile-nav .overlay");
        var $header = $(".js-mobile-header");
        window.onscroll = function(){
            var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
            if(scrollTop >= 69){
                $overlay.addClass("fixed");
            }else{
                $overlay.removeClass("fixed");
            }
            if(scrollTop >= 160){
                $header.removeClass("hide").addClass("fixed");
            }else{
                $header.addClass("hide").removeClass("fixed");
            }
        };
        $header[0].addEventListener("touchstart", function(){
            $('html, body').animate({scrollTop:0}, 'slow');
        }, false);
    };

    var resetTags = function(){
        var tags = $(".tagcloud a");
        for(var i = 0; i < tags.length; i++){
            var num = parseInt(4*Math.random()) + 1;
            tags.eq(i).addClass("color" + num);
        };
        $(".article-category a:nth-child(-n+2)").attr("class", "color5");
    }

    return{
        init: function(){
            //构造函数需要的参数
            ctn = document.getElementsByClassName("slider-trigger")[0];
            //构造四步
            reset();
            renderDOM();
            combine();
            bindDOM();
            resetTags();
        }
    }
})