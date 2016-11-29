require('../css/main.scss')
require('./report')
require('./jquery')
var tags = require('./tags')
var archiveInner = require('./archive-inner')
var tools = require('./tools')
var browser = require('./browser')
var fixPage = require('./fix-page')
var mobile = require('./mobile')
var viewer = require('./viewer')
var share = require('./share')
require('./jquery.lazyload')

$(function() {
	viewer.init()
	archiveInner.init()
	fixPage.init()
	tags.init()
	share.init()
	// todo: resize destrop
	if(browser.versions.mobile === true && $(window).width() < 800){
		mobile.init()
	}else{
		tools.init()
		$('.js-smart-menu').click(function(e) {
			e.stopPropagation()
			tools.show($(this).data('idx'))
		})
		$('.left-col,.mid-col').click(function() {
			tools.hide()
		})
	}
	// 新窗口打开
	if (yiliaConfig && yiliaConfig.open_in_new) {
		$('.article-entry a').not('.article-more-a').attr('target', '_blank')
	}
})