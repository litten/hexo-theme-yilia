var QRCodeMaker = require('./qrcode')
var QRCode = QRCodeMaker.QRCode
var QRErrorCorrectLevel = QRCodeMaker.QRErrorCorrectLevel

var basicConfig = {};
var config = {};
var qrcode, canvas, ctx;

var Tool = {
    //RGB颜色转换为16进制
    colorHex: function(color){
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var that = color;
        if(/^(rgb|RGB)/.test(that)){
            var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
            var strHex = "#";
            for(var i=0; i<aColor.length; i++){
                var hex = Number(aColor[i]).toString(16);
                if(hex === "0"){
                    hex += hex; 
                }
                strHex += hex;
            }
            if(strHex.length !== 7){
                strHex = that;  
            }
            return strHex;
        }else if(reg.test(that)){
            var aNum = that.replace(/#/,"").split("");
            if(aNum.length === 6){
                return that;    
            }else if(aNum.length === 3){
                var numHex = "#";
                for(var i=0; i<aNum.length; i+=1){
                    numHex += (aNum[i]+aNum[i]);
                }
                return numHex;
            }
        }else{
            return that;    
        }
    },
    //16进制颜色转为RGB格式
    colorRgb: function(color){
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = color.toLowerCase();
        if(sColor && reg.test(sColor)){
            if(sColor.length === 4){
                var sColorNew = "#";
                for(var i=1; i<4; i+=1){
                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));   
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for(var i=1; i<7; i+=2){
                sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));  
            }
            return "RGB(" + sColorChange.join(",") + ")";
        }else{
            return sColor;  
        }
    },
    //颜色增量变化，支持rgb，16进制和linear
    changeRGB : function(curcolor, num){
        function addRGB(val){
            var valFormat = (val.match(/\([^\)]+\)/g))[0];
            valFormat = valFormat.substr(1, valFormat.length-2);
            var arr = valFormat.split(",");
            for(var i=0,len=arr.length;i<len;i++){
                arr[i] = parseInt(arr[i]) + num;
                if(arr[i] < 0){
                    arr[i] = 0;
                }
            }
            return "rgb("+arr.join(",")+")";
        }
        if(typeof(curcolor) == "object"){
            var linear  = ctx.createLinearGradient(0,0, 0, config.width);
            for(var em in curcolor){
                var val = curcolor[em];
                val = addRGB(val);
                linear.addColorStop(em, val);
            }
            return linear;
        }else if(typeof(curcolor) == "string"){
            if(curcolor.indexOf("#") < 0){
                return addRGB(curcolor);
            }else{
                return addRGB(Tool.colorRgb(curcolor));
            }
        }
    }
}

 //画布初始化
var canvasInit = function(){
    canvas = document.createElement('canvas');
    canvas.width = config.width;
    canvas.height = config.height;
    ctx = canvas.getContext('2d');
}
//二维码数据初始化
var qrcodeInit = function(){
    qrcode  = new QRCode(config.typeNumber, config.correctLevel);
    qrcode.addData(config.text);
    qrcode.make();
}

//生成二维码
var createCanvas = function(){

    var tileW   = config.width  / qrcode.getModuleCount();
    var tileH   = config.height / qrcode.getModuleCount();
     
    drawBg();

    //绘制阴影
    if(config.shadow){
        for( var row = 0; row < qrcode.getModuleCount(); row++ ){
            for( var col = 0; col < qrcode.getModuleCount(); col++ ){
                var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
                var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
                var shadowW = config.width/150;
                drawCode(config.type, {
                    row: row,
                    col: col,
                    tileW: tileW,
                    tileH: tileH,
                    w: w+shadowW,
                    h: h+shadowW
                }, true);
            }
        }
    }
    //基本
    for( var row = 0; row < qrcode.getModuleCount(); row++ ){
        for( var col = 0; col < qrcode.getModuleCount(); col++ ){
            var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
            var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
            drawCode(config.type, {
                row: row,
                col: col,
                tileW: tileW,
                tileH: tileH,
                w: w,
                h: h
            });
              
        }
    }

    //绘制图片
    if(config.img){
        drawImg();
    }
     
    return canvas;
     
}   

 //画背景
var drawBg = function(){
    ctx.fillStyle = config.background;
    ctx.fillRect(0, 0, config.width, config.height); 
}

//画二维码
var drawCode = function(type, opt, isShadow){
    var row = opt.row;
    var col = opt.col;
    var tileW = opt.tileW;
    var tileH = opt.tileH;
    var w = opt.w;
    var h = opt.h;
     
    var shadowColor = Tool.changeRGB(basicConfig.color, -20);
    var pointShadowColor = Tool.changeRGB(basicConfig.pointColor, -20);

    //基本类型
    //单点设定颜色
    var isDark = qrcode.isDark(row, col);
    if(isDark){
        if(config.pointColor){
            drawPoint(edgeTest(row, col), isShadow);
        }else{
            if(isShadow){
                ctx.fillStyle = shadowColor;
            }else{
                ctx.fillStyle = config.color;
            }
        }
        ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h); 
    }
     
}

//生成二维码
var createCanvas = function(){

    var tileW   = config.width  / qrcode.getModuleCount();
    var tileH   = config.height / qrcode.getModuleCount();
     
    drawBg();

    //绘制阴影
    if(config.shadow){
        for( var row = 0; row < qrcode.getModuleCount(); row++ ){
            for( var col = 0; col < qrcode.getModuleCount(); col++ ){
                var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
                var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
                var shadowW = config.width/150;
                drawCode(config.type, {
                    row: row,
                    col: col,
                    tileW: tileW,
                    tileH: tileH,
                    w: w+shadowW,
                    h: h+shadowW
                }, true);
            }
        }
    }
    //基本
    for( var row = 0; row < qrcode.getModuleCount(); row++ ){
        for( var col = 0; col < qrcode.getModuleCount(); col++ ){
            var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
            var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
            drawCode(config.type, {
                row: row,
                col: col,
                tileW: tileW,
                tileH: tileH,
                w: w,
                h: h
            });
              
        }
    }
    //绘制图片
    if(config.img){
        drawImg();
    }
    return canvas;
}   

var initWX = function(dom, options){
	if (!dom) return;

    basicConfig = options;

    if( typeof options === 'string' ){
        config = options = { text: options };
    }else{
        config.text = options.text || "litten";
    }

    config.width = options.size || 200;
    config.height = options.size || 200;
    config.shadow = options.shadow || false;

    canvasInit();

    config.typeNumber = options.typeNumber || -1;
    config.correctLevel = QRErrorCorrectLevel.H;
    config.pointColor = options.pointColor || null;

    config.type = options.type || "base";
     

    //图片
    if(typeof(options.img) == "string"){
        config.img = {
            src: options.img
        }
    }else{
        config.img = options.img
    }
    //背景
    if(options.background){
        var type = typeof(options.background);
        if(type == "string"){
            config.background = options.background;
        }else if(type == "object"){
            var linear  = ctx.createLinearGradient(0,0, 0, config.width);
            for(var em in options.background){
                linear.addColorStop(parseInt(em), options.background[em]);
            }
            config.background = linear;
        }else{
            config.background = "#fff";
        }
    }else{
        config.background = "#fff";
    }
    //前景色
    if(options.color){
        var type = typeof(options.color);
        if(type == "string"){
            config.color = options.color;
        }else if(type == "object"){
            var linear  = ctx.createLinearGradient(0,0, 0, config.width);
            for(var em in options.color){
                linear.addColorStop(em, options.color[em]);
            }
            config.color = linear;
        }else{
            config.color = "#000";
        }
    }else{
        config.color = "#000";
    }

     
    qrcodeInit();
    dom.innerHTML = '';
    dom.appendChild(createCanvas());
}

var generate = function(url, opts) {
	var url = url.replace(/<%-sUrl%>/g, encodeURIComponent(opts.sUrl))
		.replace(/<%-sTitle%>/g, opts.sTitle)
		.replace(/<%-sDesc%>/g, opts.sDesc)
		.replace(/<%-sPic%>/g, encodeURIComponent(opts.sPic));

	window.open(url);
}

var showWX = function() {
	$('.js-wx-box').addClass('in ready');
	$('.mask').addClass('in');
}

var hideWX = function() {
	$('.js-wx-box').removeClass('in ready');
	$('.mask').removeClass('in');
}

var handleClick = function(type, opts) {
	if (type === 'weibo') {
		generate('http://service.weibo.com/share/share.php?url=<%-sUrl%>&title=<%-sTitle%>&pic=<%-sPic%>', opts)
	} else if (type === 'qq') {
		generate('http://connect.qq.com/widget/shareqq/index.html?url=<%-sUrl%>&title=<%-sTitle%>&source=<%-sDesc%>', opts)
	} else if (type === 'douban') {
		generate('https://www.douban.com/share/service?image=<%-sPic%>&href=<%-sUrl%>&name=<%-sTitle%>&text=<%-sDesc%>', opts)
	} else if (type === 'qzone') {
		generate('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=<%-sUrl%>&title=<%-sTitle%>&pics=<%-sPic%>&summary=<%-sDesc%>', opts)
	} else if (type === 'facebook') {
		generate('https://www.facebook.com/sharer/sharer.php?u=<%-sUrl%>', opts)
	} else if (type === 'twitter') {
		generate('https://twitter.com/intent/tweet?text=<%-sTitle%>&url=<%-sUrl%>&via=<%-config.url%>', opts)
	} else if (type === 'google') {
		generate('https://plus.google.com/share?url=<%-sUrl%>', opts)
	} else if (type === 'weixin') {
		initWX($('.wx-qrcode')[0], {
			text: opts.sUrl
		});
		showWX();
	}
}

var init = function() {
	var sUrl = window.location.href;
	var sTitle = $('title').html();
	var $img = $('.article-entry img');
	var sPic = $img.length ? $('.article-entry img').eq(0).attr('src') : '';
	if ((sPic !== '') && !/^(http:|https:)?\/\//.test(sPic)) {
		sPic = window.location.origin + sPic
	}

	var $sns = $('.share-sns');
	$sns.click(function(e) {
		var type = $(this).attr('data-type');
		handleClick(type, {
			sUrl: sUrl,
			sPic: sPic,
			sTitle: sTitle,
			sDesc: sTitle
		})
	})

	$('.js-mask').click(function() {
		hideWX();
	})

    $('.js-modal-close').click(function() {
        hideWX();
    })
}

module.exports = {
	init: init
}