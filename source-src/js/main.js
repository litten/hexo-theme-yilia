require('./jquery')

var tags = require('./tags')
var archiveInner = require('./archive-inner')
var tools = require('./tools')
var browser = require('./browser')
var fixPage = require('./fix-page')
var mobile = require('./mobile')
var viewer = require('./viewer')

$(function() {
	viewer.init()
	archiveInner.init()
	fixPage.init()
	tags.init()
	if(browser.versions.mobile === true || $(window).width() < 700){
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
})