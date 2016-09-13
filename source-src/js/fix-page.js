// 由于hexo分页不支持，手工美化

function init() {
	var $nav = $('#page-nav')
	if (!$nav.find('.extend.prev').length) {
		$nav.prepend('<a class="extend prev disabled" rel="prev">&laquo; Prev</a>')
	}
	if (!$nav.find('.extend.next').length) {
		$nav.append('<a class="extend next disabled" rel="next">Next &raquo;</a>')
	}
}

module.exports = {
	init : init
}