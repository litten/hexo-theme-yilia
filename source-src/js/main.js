// 样式
import '../css/main.scss'
// 上报
import './report'
// fix hexo 不支持的配置
import Fix from './fix'
// 图片查看器
import Viewer from './viewer'
// 分享
import Share from './share'
// slider
import Slider from './slider'
// 动画
import Anm from './anm'
// 浏览器判断
import Browser from './browser'
// 手机
import Mobile from './mobile'

window.onload = () => {
	if(Browser.versions.mobile && window.screen.width < 800){
		Mobile.init()
	}else{
		Slider.init()
	}
	Fix.init()
	Share.init()
	Anm.init()
	Viewer.init()
}

