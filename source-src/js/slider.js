import Vue from 'vue'

let localKey = 'yilia-tag'

function fixzero(str) {
	str = str + ''
	return str.length === 1 ? '0' + str : str
}
function init() {
	Vue.filter('urlformat', (str) => {
		return '/' + str
	})
	Vue.filter('dateformat', (str) => {
		let d = new Date(str)
		return d.getFullYear() + '-' + fixzero((d.getMonth() + 1)) + '-' + fixzero(d.getDate())
	})

	var app = new Vue({
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
				app.search = '#' + (name ? name : e.target.innerHTML)
			},
			clearChose: (e) => {
				app.search = ''
			},
			toggleTag: (e) => {
				app.showTags = !app.showTags
				window.localStorage && window.localStorage.setItem(localKey, app.showTags)
			},
			openSlider: (e, type) => {
				e.stopPropagation()
				// innerArchive: '所有文章'
  				// friends: '友情链接'
  				// aboutme: '关于我'
				app['innerArchive'] = false
				app['friends'] = false
				app['aboutme'] = false
				app[type] = true
				app.isShow = true
				app.isCtnShow = true
			}
		},
		watch: {
		    search: (val, oldVal) => {
		    	let self = this
		    	let type = 'title'
		    	if (val.indexOf('#') === 0) {
		    		val = val.substr(1, val.length)
		    		type = 'tag'
		    	}
		      	app.items.forEach((item) => {
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
		      			item.isHide = null
		      		} else {
		      			item.isHide = true
		      		}
		      	})
		    }
		}
	})

	fetch('/content.json?t=' + (+ new Date()), {
		method: 'get',
	}).then((res) => {
		return res.json()
	}).then((data) => {
		app.items = data
	}).catch((err) => {
	    app.jsonFail = true
	});

	// 隐藏
	document.querySelector('#container').onclick = (e) => {
		if (app.isShow) {
			app.isShow = false
			setTimeout(() => {
				app.isCtnShow = false
			}, 300)
		}
	}

	// tag 显示/隐藏
	var isTagOn = (window.localStorage && window.localStorage.getItem(localKey)) || 'false'
	app.showTags = JSON.parse(isTagOn)

	// 其他标签点击
	// 标签
	var $tags = document.querySelectorAll('.tagcloud a')
	$tags.forEach(($em) => {
		$em.setAttribute('href', 'javascript:void(0)')
		$em.onclick = (e) => {
			e.stopPropagation()
			app['innerArchive'] = true
			app['friends'] = false
			app['aboutme'] = false
			app.isShow = true
			app.isCtnShow = true
			app.search = '#' + $em.innerHTML
		}
	})
}


module.exports = {
	init : init
}