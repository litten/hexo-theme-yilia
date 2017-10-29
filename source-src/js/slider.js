// 动画
import Anm from './anm'
// 浏览器判断
import Browser from './browser'
// Q 基础库
import Q from './Q'
// 神特么safari不支持fetch
import * as promise from 'es6-promise'
import * as fetch from 'fetch-ie8'

window.Promise = window.Promise || promise.Promise
window.fetch = window.fetch || fetch

let localTagKey = 'yilia-tag'
let localSearchKey = 'yilia-search'
const isMobile = (Browser.versions.mobile && window.screen.width < 800)

function fixzero(str) {
	str = str + ''
	return str.length === 1 ? '0' + str : str
}

function setScrollZero() {
	let $sct = document.querySelectorAll('.tools-section')
	$sct.forEach((em) => {
		em.scrollTop = 0
	})
}

function init() {
	let app = new Q({
	    el: '#container',
	    data: {
			isCtnShow: false,
			isShow: 0,
			innerArchive: false,
			friends: false,
			aboutme: false,
			items: [],
			jsonFail: false,
			showTags: false,
			search: ''
		},
	    methods: {
	    	stop: (e) => {
	    		e.stopPropagation()
	    	},
	    	choseTag: (e, name) => {
	    		app.$set('search', '#' + (name ? name : e.target.innerHTML))
	    	},
	    	clearChose: (e) => {
	    		app.$set('search', '')
	    	},
	    	toggleTag: (e) => {
	    		app.$set('showTags', !app.showTags)
	    		window.localStorage && window.localStorage.setItem(localTagKey, app.showTags)
	    	},
	        openSlider: (e, type) => {
	        	e.stopPropagation()
	        	if (!type) {
	        		type = 'innerArchive'
	        	}
				// innerArchive: '所有文章'
  				// friends: '友情链接'
  				// aboutme: '关于我'
  				app.$set('innerArchive', false)
  				app.$set('friends', false)
  				app.$set('aboutme', false)
  				app.$set(type, true)
  				app.$set('isShow', true)
  				app.$set('isCtnShow', true)
  				setScrollZero()
			}
	    },
	    filters: {
	    	isFalse: (val) => {
	    		return val === false
	    	},
	    	isEmptyStr: (str) => {
	    		return str === ''
	    	},
	    	isNotEmptyStr: (str) => {
	    		return str !== ''
	    	},
	    	urlformat: (str) => {
				if (window.yiliaConfig && window.yiliaConfig.root) {
					return window.yiliaConfig.root + str
				}
	    		return '/' + str
	    	},
	    	tagformat: (str) => {
	    		return '#' + str
	    	},
	    	dateformat: (str) => {
	    		let d = new Date(str)
	    		return d.getFullYear() + '-' + fixzero((d.getMonth() + 1)) + '-' + fixzero(d.getDate())
	    	}
	    },
	    ready: () => {
	    }
	})

	function handleSearch(val) {
		val = (val || '').toLowerCase()
		let type = 'title'
		if (val.indexOf('#') === 0) {
			val = val.substr(1, val.length)
			type = 'tag'
		}
		let items = app.items
	  	items.forEach((item) => {
	  		let matchTitle = false
	  		if (item.title.toLowerCase().indexOf(val) > -1) {
	  			matchTitle = true
	  		}

	  		let matchTags = false
	  		item.tags.forEach((tag) => {
	  			if (tag.name.toLowerCase().indexOf(val) > -1) {
	      			matchTags = true
	      		}
	  		})

	  		if ((type === 'title' && matchTitle) || (type === 'tag' && matchTags)) {
	  			item.isShow = true
	  		} else {
	  			item.isShow = false
	  		}
	  	})
	  	app.$set('items', items)
	}

	app.$watch('search', function(val, oldVal){
		window.localStorage && window.localStorage.setItem(localSearchKey, val)
		handleSearch(val)
    })

	window.fetch(window.yiliaConfig.root + 'content.json?t=' + (+ new Date()), {
		method: 'get',
	}).then((res) => {
		return res.json()
	}).then((data) => {
		data.forEach((em) => {
			em.isShow = true
		})
		app.$set('items', data)
		// 搜索
		let searchWording = (window.localStorage && window.localStorage.getItem(localSearchKey)) || ''
		app.$set('search', searchWording)
		searchWording !== '' && handleSearch(searchWording)
	}).catch((err) => {
		app.$set('jsonFail', true)
	});

	// 隐藏
	document.querySelector('#container').onclick = (e) => {
		if (app.isShow) {
			app.$set('isShow', false)
			setTimeout(() => {
				app.$set('isCtnShow', false)
			}, 300)
		}
	}

	// tag 显示/隐藏
	let localTag = false
	if (window.localStorage) {
		localTag = window.localStorage.getItem(localTagKey)
	}
	let isTagOn = 'false'
	if (localTag === null) {
		isTagOn = (window.yiliaConfig && window.yiliaConfig.showTags) ? 'true' : 'false'
	} else {
		isTagOn = (window.localStorage && window.localStorage.getItem(localTagKey)) || 'false'
	}
	app.$set('showTags', JSON.parse(isTagOn))

	// 其他标签点击
	// 标签
	let $tags = document.querySelectorAll('.tagcloud a.js-tag')
	for (var i = 0, len = $tags.length; i < len; i++) {
		let $em = $tags[i]
		$em.setAttribute('href', 'javascript:void(0)')
		$em.onclick = (e) => {
			e.stopPropagation()
			app.$set('innerArchive', true)
			app.$set('friends', false)
			app.$set('aboutme', false)
			app.$set('isShow', true)
			app.$set('isCtnShow', true)
			app.$set('search', '#' + $em.innerHTML)
			setScrollZero()
			return false
		}
	}
}

init()
if (!isMobile) {
	Anm.init()
}

module.exports = {}