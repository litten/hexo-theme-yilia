
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/default-skin/default-skin.css'
import 'photoswipe/dist/photoswipe.css'

window.PhotoSwipe = PhotoSwipe
window.PhotoSwipeUI_Default = PhotoSwipeUI_Default

function init() {
	let pswpElement = document.querySelectorAll('.pswp')[0];
	let $imgArr = document.querySelectorAll(('.article-entry img:not(.reward-img)'))

	$imgArr.forEach(($em, i) => {
		$em.onclick = () => {
			// slider展开状态
			// todo: 这样不好，后面改成状态
			if (document.querySelector('.left-col.show')) return
			let items = []
			$imgArr.forEach(($em2, i2) => {
				let img = $em2.getAttribute('data-idx', i2)
				let src = $em2.getAttribute('data-target') || $em2.getAttribute('src')
				let title = $em2.getAttribute('alt')
				items.push({
					src: src,
					w: $em2.width,
					h: $em2.height,
					title: title
				})
			})
			var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
				index: parseInt(i)
			});
			gallery.init()
		}
	})
}

module.exports = {
	init: init
}
