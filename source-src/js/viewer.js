/*require('../fancybox/jquery.fancybox')
require('../fancybox/jquery.fancybox.scss')

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

module.exports = {
	init: fancyInit
}*/

var PhotoSwipe = require('../photoSwipe/photoswipe')
var PhotoSwipeUI_Default = require('../photoSwipe/photoswipe-ui-default')
require('../photoSwipe/default-skin/default-skin.scss')
require('../photoSwipe/photoswipe.scss')

window.PhotoSwipe = PhotoSwipe
window.PhotoSwipeUI_Default = PhotoSwipeUI_Default

module.exports = {
	init: function() {
		var pswpElement = document.querySelectorAll('.pswp')[0];
		var imgArr = $(".article-entry img");

		imgArr.click(function(e) {
			// 再重置一遍，以防未加载完成
			// TODO：不太好，后面优化
			imgArr = $(".article-entry img");
			var items = []
			for(var i=0,len=imgArr.length;i<len;i++){
				var img = imgArr.eq(i).attr('data-idx', i)
				var src = img.attr("data-target") || img.attr("src");
				var title = img.attr("alt");
				items.push({
					src: src,
					w: img.width(),
					h: img.height(),
					title: title
				})
			}

			var idx = $(this).attr('data-idx')
			var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
				index: parseInt(idx)
			});
			gallery.init()
		})
		
	}
}