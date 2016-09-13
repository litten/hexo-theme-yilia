require('./jquery')
require('../fancybox/jquery.fancybox')
require('../fancybox/jquery.fancybox.scss')
var tags = require('./tags')
var archiveInner = require('./archive-inner')
var tools = require('./tools')
var switchBtn = require('./switch-btn')
var fixPage = require('./fix-page')
var mobile = require('./mobile')

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

$(function() {
	switchBtn.init()
	archiveInner.init()
	fixPage.init()
	tools.init()
	tags.init()
	mobile.init()
	fancyInit();
	$('.js-smart-menu').click(function(e) {
		e.stopPropagation()
		tools.show($(this).data('idx'))
	})
	$('.left-col,.mid-col').click(function() {
		tools.hide()
	})
})