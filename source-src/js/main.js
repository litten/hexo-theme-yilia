require('../css/main.scss')

require('badjs-report')

// 统计用，开发者不需要理会
if (window.BJ_REPORT) {
	BJ_REPORT.init({
  		id: 1
	});
	BJ_REPORT.init({
		id: 1,                                
		uin: window.location.origin,          
		combo: 0,                             
		delay: 1000,                          
		url: "//litten.me:9005/badjs/",       
		ignore: [/Script error/i],           
		random: 1,                            
		repeat: 500000,                         
		onReport: function(id, errObj){},    
		ext: {}                             
	});
	// iframe不上报
	var host = window.location.host
	var isNotFrame = (top === window)
	var isNotLocal = !((/localhost/i.test(host) || /127.0.0.1/i.test(host) || /0.0.0.0/i.test(host)))
	isNotFrame && isNotLocal && BJ_REPORT.report('yilia-' + window.location.host)
}

require('./jquery')
var tags = require('./tags')
var archiveInner = require('./archive-inner')
var tools = require('./tools')
var browser = require('./browser')
var fixPage = require('./fix-page')
var mobile = require('./mobile')
var viewer = require('./viewer')
require('./jquery.lazyload')

$(function() {
	viewer.init()
	archiveInner.init()
	fixPage.init()
	tags.init()
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

	if (yiliaConfig && yiliaConfig.open_in_new) {
		$('.article-entry a').not('.article-more-a').attr('target', '_blank')
	}
})