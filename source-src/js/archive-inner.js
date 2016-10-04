var browser = require('./browser')

var isMobile = browser.versions.mobile === true && $(window).width() < 800

function init() {
	var frameClass = 'js-archives-frame'

	if (top !== window) {
		// 子级

		// 特殊样式
		$('body').addClass('archive-inner')
		// 父级跳转
		$('.archive-article-title').click(function() {
			var link = $(this).attr('href')
			top.location.href = link
			return false
		})
		// 页码
		$('.page-number').click(function() {
			$(top.document).find('.' + frameClass).hide()
		})
		// 去掉日期点击
		$('.archive-article-date').attr('href', 'javascript:void(0);')
	} else if (! /\/archives\/(.*)/.test(window.location.pathname) && !isMobile) {
		// 父级
		var $frame = $('<iframe class="' + frameClass + '"></iframe>').attr('src', '/archives/')
		$('.tools-section-all').append($frame)
		// 避免闪动
		$frame[0].onload = function() {
			var timeout = setInterval(function() {
				var framebody = $($('.js-archives-frame')[0].contentWindow.document).find('.archive-inner')
				if (framebody.length) {
					$frame.show()
					clearTimeout(timeout)
				}
			}, 50)
			
		}
	}
}

module.exports = {
	init : init
}
