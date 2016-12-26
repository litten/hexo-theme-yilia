import addClass from 'dom101/add-class'
import removeClass from 'dom101/remove-class'
import after from 'dom101/after'
// 浏览器判断
import Browser from './browser'

function isPathMatch(path, href) {
	let reg = /\/|index.html/g
	return (path.replace(reg, '')) === (href.replace(reg, ''))
}

function tabActive() {
	let $tabs = document.querySelectorAll('.js-header-menu li a')
	let path = window.location.pathname
	$tabs.forEach(($tab) => {
		if (isPathMatch(path, $tab.getAttribute('href'))) {
			addClass($tab, 'active')
		}
	})
}

function getElementLeft(element) {　　　　
	var actualLeft = element.offsetLeft;　　　　
	var current = element.offsetParent;　　　　
	while (current !== null) {　　　　　　
		actualLeft += current.offsetLeft;　　　　
		current = current.offsetParent;　　
	}　　
	return actualLeft;
}　　
function getElementTop(element) {　　　　
	var actualTop = element.offsetTop;　　　　
	var current = element.offsetParent;　　　　
	while (current !== null) {　　　　　　
		actualTop += current.offsetTop;　　　　　　
		current = current.offsetParent;　　　　
	}　　　　
	return actualTop;　　
}

function scrollStop($dom, top, limit, zIndex, diff) {
	let nowLeft = getElementLeft($dom)
	let nowTop = getElementTop($dom) - top
		// let nowTop = $dom.offsetTop - document.body.scrollTop
		// console.log(nowTop)
	if (nowTop - limit <= diff) {
		let $newDom = $dom.$newDom
		if (!$newDom) {
			$newDom = $dom.cloneNode(true)
			after($dom, $newDom)
			$dom.$newDom = $newDom
			$newDom.style.position = 'fixed'
			$newDom.style.top = (limit || nowTop) + 'px'
			$newDom.style.left = nowLeft + 'px'
			$newDom.style.zIndex = zIndex || 2
			$newDom.style.width = '100%'
			$newDom.style.color = '#fff'
		}
		$newDom.style.visibility = 'visible'
		$dom.style.visibility = 'hidden'
		return true
			//$dom.style.top = (top + 'px')
	} else {
		//console.log(top - limit)
		$dom.style.visibility = 'visible'
		let $newDom = $dom.$newDom
		if ($newDom) {
			$newDom.style.visibility = 'hidden'
		}
		return false
	}
}

function handleScroll() {
	let $overlay = document.querySelector('.js-overlay')
	let $menu = document.querySelector('.js-header-menu')
	//let $mobileCtn = document.querySelector('.js-mobile-btnctn')
	scrollStop($overlay, document.body.scrollTop, -63, 1, 0)
	scrollStop($menu, document.body.scrollTop, 1, 2, 0)
	//scrollStop($mobileCtn, document.body.scrollTop, -5)
}

function bindScroll() {
	document.querySelector('#container').addEventListener('scroll', (e) => {
		handleScroll()
	})

	/*window.onscroll = (e) => {
		handleScroll()
	}*/
	window.addEventListener('scroll', (e) => {
		handleScroll()
	})
	handleScroll()
}

function init() {
	if (Browser.versions.mobile && window.screen.width < 800) {
		tabActive()
		bindScroll()
	}
}

init();

module.exports = {
}