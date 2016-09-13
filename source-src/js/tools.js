var Util = require('./util')
var $article, $tools
var localKey = 'yilia-menu'

function triggerClk(idx) {
	$('.btn-wrap li').eq(idx).trigger('click')
}
function init() {
	// 变量初始化
	$article = $('.mid-col')
	$tools = $('.tools-col')

	// 切换
	$('.btn-wrap li').click(function() {
		var idx = $(this).index()
		window.localStorage.setItem(localKey, idx)
		$('.btn-wrap li').removeClass('chose')
		$(this).addClass('chose')
		$('.tools-section').removeClass('chose')
		$('.tools-wrap .tools-section').eq(idx).addClass('chose')
	})

	// 本地缓存
	var initIndex = parseInt(window.localStorage.getItem(localKey) || 0)
	triggerClk(initIndex)

	// about me
	var $about = $('.aboutme-wrap')
	var aboutStr = $about.html()
	$about.html(Util.decode(aboutStr))
}

function toggle() {
	$article.toggleClass('show')
	$tools.toggleClass('show')
}

function show(idx) {
	triggerClk(idx)
	$article.addClass('show')
	$tools.addClass('show')
}

function hide() {
	$article.removeClass('show')
	$tools.removeClass('show')
}

module.exports = {
	init : init,
	toggle: toggle,
	show: show,
	hide: hide
}