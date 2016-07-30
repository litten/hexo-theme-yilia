/**
 * @author littenli
 * @date 2014-03-10 version 0.2
 * @description 图片延时加载，裂图替换，图片错误上报处理
 * @update 增加非可视区域延时加载
 * @example $(".container").lazy(options);
 *          遍历$(".container")节点内的img节点，都应用lazyload；若此节点为img节点，只应用此节点
 *          options.srcSign {String} 可为空.img节点约定的src标志，默认为lazy-src；响应img节点为：<img lazy-src="img/hello.jpg" />
 *          options.errCallBack {Function} 可为空.提供img加载失败回调，供业务额外去处理加载失败逻辑
 *          options.container {Dom} 提供容器节点内可视区域的加载能力，默认为window
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root['jQuery']);
    }
}(this, function ($) {

    $.fn.lazyload = function(options) {
        return this.each(function() {

            options = options || {};
            var defualts = {};

            var opts = $.extend({}, defualts, options);
            var obj = $(this);
            var dom = this;

            var srcSign = options.srcSign || "lazy-src";
            var errCallBack = options.errCallBack || function(){};
            var container = options.container || $(window);

            /**
             * @description src正常
             */
            var imgload = function (e, target) {
                //todo: 上报
            }

            /**
             * @description src失效
             */
            var imgerr = function (e, target, fn, src) {
                if(target[0].src && (target[0].src.indexOf("img-err.png")>0 || target[0].src.indexOf("img-err2.png")>0)){
                    return ;
                }
                var w = target.width();
                var h = target.height();
                target[0].src = yiliaConfig.root + "/img/img-err.png";

                fn();
                //todo: 上报
            };

            var tempImg = function(target){
                var w = target.width();
                var h = target.height();
                var t = target.offset().top;
                var l = target.offset().left;
                var tempDom = target.clone().addClass("lazy-loding").insertBefore(target);
                tempDom[0].src = yiliaConfig.root + "/img/img-loading.png";
                target.hide();
            }
            /**
             * @description src替换，loading过程中添加类lazy-loading;
             */
            var setSrc = function(target, srcSign, errCallBack){

                if(target.attr("src"))return ;

                if(options.cache == true){
                    console.log(target);
                    //存进localstorage
                    var canvas1 = document.getElementById('canvas1');
                    var ctx1 = canvas1.getContext('2d');
                    var imageData;

                    image = new Image();
                    image.src = target.attr(srcSign);
                    image.onload=function(){
                        ctx1.drawImage(image,0,0);
                        imageData = ctx1.getImageData(0,0,500,250);
                        console.log(imageData);
                    }

                }else{
                    tempImg(target);

                    var src = target.attr(srcSign);
                    target[0].onerror = function (e) {
                        imgerr(e, target, errCallBack, src);
                    };
                    target[0].onload = function (e) {
                        target.parent().find(".lazy-loding").remove();
                        target.show();
                        imgload(e, target);
                    }
                    target[0].src = src;
                }
            }

            /**
             * @description 重组
             */
            opts.cache = [];

            if(dom.tagName == "IMG"){
                var data = {
                    obj: obj,
                    tag: "img",
                    url: obj.attr(srcSign)
                };
                opts.cache.push(data);
            }else{
                var imgArr = obj.find("img");
                imgArr.each(function(index) {
                    var node = this.nodeName.toLowerCase(), url = $(this).attr(srcSign);
                    //重组
                    var data = {
                        obj: imgArr.eq(index),
                        tag: node,
                        url: url
                    };
                    opts.cache.push(data);
                });
            }


            //动态显示数据
            var scrollHandle = function() {
                var contHeight = container.height();
                var contop;
                if ($(window).get(0) === window) {
                    contop = $(window).scrollTop();
                } else {
                    contop = container.offset().top;
                }
                $.each(opts.cache, function(i, data) {
                    var o = data.obj, tag = data.tag, url = data.url, post, posb;
                    if (o) {
                        post = o.offset().top - contop, post + o.height();

                        if ((post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight)) {
                            if (url) {
                                //在浏览器窗口内
                                if (tag === "img") {
                                    //改变src
                                    setSrc(o, srcSign, errCallBack);
                                }
                            }
                            data.obj = null;
                        }
                    }
                });
            }

            //加载完毕即执行
            scrollHandle();
            //滚动执行
            container.bind("scroll", scrollHandle);
            container.bind("resize", scrollHandle);

        });
    };

}));
