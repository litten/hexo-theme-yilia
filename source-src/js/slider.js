// 动画
import Anm from './anm'
// Q 基础库
import Q from './Q'

let localKey = 'yilia-tag'

function fixzero(str) {
	str = str + ''
	return str.length === 1 ? '0' + str : str
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
	    		window.localStorage && window.localStorage.setItem(localKey, app.showTags)
	    	},
	        openSlider: (e, type) => {
				e.stopPropagation()
				// innerArchive: '所有文章'
  				// friends: '友情链接'
  				// aboutme: '关于我'
  				app.$set('innerArchive', false)
  				app.$set('friends', false)
  				app.$set('aboutme', false)
  				app.$set(type, true)
  				app.$set('isShow', true)
  				app.$set('isCtnShow', true)
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

	app.$watch('search', function(val, oldVal){
    	let type = 'title'
    	if (val.indexOf('#') === 0) {
    		val = val.substr(1, val.length)
    		type = 'tag'
    	}
    	let items = app.items
      	items.forEach((item) => {
      		let matchTitle = false
      		if (item.title.indexOf(val) > -1) {
      			matchTitle = true
      		}

      		let matchTags = false
      		item.tags.forEach((tag) => {
      			if (tag.name.indexOf(val) > -1) {
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
    })

	fetch('/content.json?t=' + (+ new Date()), {
		method: 'get',
	}).then((res) => {
		return res.json()
	}).then((data) => {
		data.forEach((em) => {
			em.isShow = true
		})
		app.$set('items', data)
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
	var isTagOn = (window.localStorage && window.localStorage.getItem(localKey)) || 'false'
	app.$set('showTags', JSON.parse(isTagOn))

	// 其他标签点击
	// 标签
	var $tags = document.querySelectorAll('.tagcloud a')
	$tags.forEach(($em) => {
		$em.setAttribute('href', 'javascript:void(0)')
		$em.onclick = (e) => {
			e.stopPropagation()
			app.$set('innerArchive', true)
			app.$set('friends', false)
			app.$set('aboutme', false)
			app.$set('isShow', true)
			app.$set('isCtnShow', true)
			app.$set('search', '#' + $em.innerHTML)
		}
	})
}

init()
Anm.init()

module.exports = {}