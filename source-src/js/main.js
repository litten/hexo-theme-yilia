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

window.onload = () => {
	Fix.init()
	Share.init()
	Viewer.init()
}

