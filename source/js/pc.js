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

    var slide = function(idx){
        // 修复IE10+切换无效的bug
        var $wrap = $(".switch-wrap"),
          transform = [
              '-webkit-transform: translate(-' + idx * 100 + '%, 0);',
              '-moz-transform: translate(-' + idx * 100 + '%, 0);',
              '-o-transform: translate(-' + idx * 100 + '%, 0);',
              '-ms-transform: translate(-' + idx * 100 + '%, 0);',
              'transform: translate(-' + idx * 100 + '%, 0);'
          ];
        //$wrap.css({
        //    "transform": "translate(-"+idx*100+"%, 0 )"
        //});
        $wrap[0].style.cssText = transform.join('');
        $(".icon-wrap").addClass("hide");
        $(".icon-wrap").eq(idx).removeClass("hide");
    }

    var resetTags = function(){
        var tags = $(".tagcloud a");
        for(var i = 0; i < tags.length; i++){
            var num = parseInt(4*Math.random()) + 1;
            tags.eq(i).addClass("color" + num);
        };
        $(".article-category a:nth-child(-n+2)").attr("class", "color5");
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

    var miniArchives = function(){
        if(yiliaConfig.isPost) {
            $(".post-list").addClass("toc-article");
            $(".post-list-item a").attr("target","_blank");
            $("#post-nav-button > a:nth-child(2)").click(function() {
                $(".fa-bars, .fa-times").toggle();
                $(".post-list").toggle(300);
                if ($(".toc").length > 0) {
                    $("#toc, #tocButton").toggle(200, function() {
                        if ($(".switch-area").is(":visible")) {
                            $("#toc, .switch-btn, .switch-area").toggle();
                            $("#tocButton").attr("value", valueHide);
                            }
                        });
                }
                else {
                    $(".switch-btn, .switch-area").fadeToggle(300);
                }
            });
        }
    }

    var tooltip = function(){
        $(function() {
            // if _config.yml => jquery_ui: false
            if (!$().tooltip) return;
            if (navigator.userAgent.match(/(iPhone|iPad|Android|ios|PlayBook|Touch)/i)) return;
            $("[title]").tooltip({
                show: {
                    effect: 'blind',
                    delay: 250,
                    duration: 55,
                }
            })
            $("#scroll").tooltip({
                show: {
                    effect: 'clip',
                    delay: 600,
                    duration: 50,
                }
            })
            $("#tocButton, #comments").tooltip({
                show: {
                    delay: 1200,
                }
            })
            $(".ds-replybox form").off("tooltip")
            $("#post-nav-button").tooltip({
                show: {
                    effect: 'clip',
                    delay: 280,
                    duration: 65,
                }
            })
            $("#post-nav-button > a:nth-child(2)").tooltip({
                show: {
                    delay: 1500,
                }
            })
            $(".social").tooltip({
                show: {
                    effect: 'scale',
                    delay: 350,
                    duration: 70,
                }
            })
        });
    }

    return {
        init: function(){
            resetTags();
            bind();
            Tips.init();
            miniArchives();
            tooltip();
        }
    }
});
